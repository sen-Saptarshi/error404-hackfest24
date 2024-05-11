import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import pandas as pd
from torch.utils.data import Dataset, DataLoader

# -------
import Transformer
from functions_training import *
from objects_for_training import *
# -------

START_TOKEN = '<START>'
PADDING_TOKEN = '<PADDING>'
END_TOKEN = '<END>'

# Importing datasets
Lang1_dataset = pd.read_csv('datasets/english_dataset.csv').values
Lang1_sentences = []
for i in Lang1_dataset:
  Lang1_sentences.append(i[0])

Lang2_dataset = pd.read_csv('datasets/hinglish_datset.csv')
Lang2_sentences = []
for i in Lang2_dataset.values:
  Lang2_sentences.append(i[0])

# Getting the vocabulary
vocabulary = pd.read_csv('vocabulary/eng_hing_vocab.csv')
Lang1_vocab = vocabulary.values.tolist()
Lang2_vocab = vocabulary.values.tolist()

engvocab = []
for i in Lang1_vocab:
  engvocab.append(i[1])
Lang1_vocab = engvocab
Lang2_vocab = engvocab

# Making a dictionary
index_to_Lang2 = {k:v for k,v in enumerate(Lang2_vocab)}
Lang2_to_index = {v:k for k,v in enumerate(Lang2_vocab)}
index_to_Lang1 = {k:v for k,v in enumerate(Lang1_vocab)}
Lang1_to_index = {v:k for k,v in enumerate(Lang1_vocab)}

# Making the training dataset
TOTAL_SENTENCES = 200000
Lang1_sentences = Lang1_sentences[:TOTAL_SENTENCES]
Lang2_sentences = Lang2_sentences[:TOTAL_SENTENCES]

max_sequence_length = 200

# Removing invalid sentences
valid_sentence_indicies = []
for index in range(len(Lang2_sentences)):
    Lang2_sentence, Lang1_sentence = Lang2_sentences[index], Lang1_sentences[index]
    if is_valid_length(Lang2_sentence, max_sequence_length) \
      and is_valid_length(Lang1_sentence, max_sequence_length) \
      and is_valid_tokens(Lang2_sentence, Lang2_vocab):
        valid_sentence_indicies.append(index)

Lang2_sentences = [Lang2_sentences[i] for i in valid_sentence_indicies]
Lang1_sentences = [Lang1_sentences[i] for i in valid_sentence_indicies]

START_TOKEN = '<START>'
PADDING_TOKEN = '<PADDING>'
END_TOKEN = '<END>'

# Making the model

d_model = 512
batch_size = 30
ffn_hidden = 2048
num_heads = 8
drop_prob = 0.1
num_layers = 1
max_sequence_length = 200
Lang2_vocab_size = len(Lang2_vocab)

transformer = Transformer(d_model,
                          ffn_hidden,
                          num_heads,
                          drop_prob,
                          num_layers,
                          max_sequence_length,
                          Lang2_vocab_size,
                          Lang1_to_index,
                          Lang2_to_index,
                          START_TOKEN,
                          END_TOKEN,
                          PADDING_TOKEN)

# Training
dataset = TextDataset(Lang1_sentences, Lang2_sentences)
train_loader = DataLoader(dataset, batch_size)
iterator = iter(train_loader)

for batch_num, batch in enumerate(iterator):
    if batch_num > 3:
        break

criterian = nn.CrossEntropyLoss(ignore_index=Lang2_to_index[PADDING_TOKEN],
                                reduction='none')

# When computing the loss, we are ignoring cases when the label is the padding token
for params in transformer.parameters():
    if params.dim() > 1:
        nn.init.xavier_uniform_(params)

optim = torch.optim.Adam(transformer.parameters(), lr=1e-4)
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

# -------
transformer.train()
transformer.to(device)
total_loss = 0
num_epochs = 4
# -------

# Start training loop

for epoch in range(num_epochs):
    print(f"Epoch {epoch}")
    iterator = iter(train_loader)
    for batch_num, batch in enumerate(iterator):
        transformer.train()
        Lang1_batch, Lang2_batch = batch
        encoder_self_attention_mask, decoder_self_attention_mask, decoder_cross_attention_mask = create_masks(Lang1_batch, Lang2_batch)
        optim.zero_grad()
        Lang2_predictions = transformer(Lang1_batch,
                                     Lang2_batch,
                                     encoder_self_attention_mask.to(device),
                                     decoder_self_attention_mask.to(device),
                                     decoder_cross_attention_mask.to(device),
                                     enc_start_token=False,
                                     enc_end_token=False,
                                     dec_start_token=True,
                                     dec_end_token=True)
        labels = transformer.decoder.sentence_embedding.batch_tokenize(Lang2_batch, start_token=False, end_token=True)
        loss = criterian(
            Lang2_predictions.view(-1, Lang2_vocab_size).to(device),
            labels.view(-1).to(device)
        ).to(device)
        valid_indicies = torch.where(labels.view(-1) == Lang2_to_index[PADDING_TOKEN], False, True)
        loss = loss.sum() / valid_indicies.sum()
        loss.backward()
        optim.step()
        #train_losses.append(loss.item())
        if batch_num % 100 == 0:
            print(f"Iteration {batch_num} : {loss.item()}")
            print(f"Lang1: {Lang1_batch[0]}")
            print(f"Lang2 Translation: {Lang2_batch[0]}")
            Lang2_sent_predicted = torch.argmax(Lang2_predictions[0], axis=1)
            predicted_sentence = ""
            for idx in Lang2_sent_predicted:
              if idx == Lang2_to_index[END_TOKEN]:
                break
              predicted_sentence += index_to_Lang2[idx.item()]
            print(f"Lang2 Prediction: {predicted_sentence}")


            transformer.eval()
            Lang2_sent = ("",)
            eng_sentence = ("should we go to the mall?",)
            for word_counter in range(max_sequence_length):
                encoder_self_attention_mask, decoder_self_attention_mask, decoder_cross_attention_mask= create_masks(eng_sentence, Lang2_sent)
                predictions = transformer(eng_sentence,
                                          Lang2_sent,
                                          encoder_self_attention_mask.to(device),
                                          decoder_self_attention_mask.to(device),
                                          decoder_cross_attention_mask.to(device),
                                          enc_start_token=False,
                                          enc_end_token=False,
                                          dec_start_token=True,
                                          dec_end_token=False)
                next_token_prob_distribution = predictions[0][word_counter] # not actual probs
                next_token_index = torch.argmax(next_token_prob_distribution).item()
                next_token = index_to_Lang2[next_token_index]
                Lang2_sent = (Lang2_sent[0] + next_token, )
                if next_token == END_TOKEN:
                  break


            print(f"Evaluation translation (should we go to the mall?) : {Lang2_sent}")
            print("-------------------------------------------")

transformer.eval()
torch.save(transformer.state_dict(), 'Models/eng_to_hing_st.pt')
