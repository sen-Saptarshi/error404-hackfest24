import torch
import pandas as pd
# import torch.nn as nn
# import torch.nn.functional as F
# import numpy as np
# from translate_eng_hing import index_to_kannada
from objects_for_training import create_masks

# START_TOKEN = '<START>'
# PADDING_TOKEN = '<PADDING>'
# END_TOKEN = '<END>'

def is_valid_tokens(sentence, vocab):
    for token in list(set(sentence)):
        if token not in vocab:
            return False
    return True

def is_valid_length(sentence, max_sequence_length):
    return len(list(sentence)) < (max_sequence_length - 1) # need to re-add the end token so leaving 1 space

def translate(eng_sentence, transformer):
  vocabulary = pd.read_csv('vocabulary/eng_hing_vocab.csv')
  english_vocabulary = vocabulary.values.tolist()
  kannada_vocabulary = vocabulary.values.tolist()

  engvocab = []
  for i in english_vocabulary:
      engvocab.append(i[1])
  english_vocabulary = engvocab
  kannada_vocabulary = engvocab

  index_to_kannada = {k:v for k,v in enumerate(kannada_vocabulary)}
  device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
  START_TOKEN = '<START>'
  PADDING_TOKEN = '<PADDING>'
  END_TOKEN = '<END>'
  max_sequence_length = 200
  transformer.eval()

  eng_sentence = (eng_sentence,)
  kn_sentence = ("",)
  for word_counter in range(max_sequence_length):
    encoder_self_attention_mask, decoder_self_attention_mask, decoder_cross_attention_mask= create_masks(eng_sentence, kn_sentence)
    predictions = transformer(eng_sentence,
                              kn_sentence,
                              encoder_self_attention_mask.to(device),
                              decoder_self_attention_mask.to(device),
                              decoder_cross_attention_mask.to(device),
                              enc_start_token=False,
                              enc_end_token=False,
                              dec_start_token=True,
                              dec_end_token=False)
    next_token_prob_distribution = predictions[0][word_counter]
    next_token_index = torch.argmax(next_token_prob_distribution).item()
    next_token = index_to_kannada[next_token_index]
    kn_sentence = (kn_sentence[0] + next_token, )
    if next_token == END_TOKEN:
      break
  return kn_sentence[0]

if __name__=="__main__":
   max_sequence_length = 200
   device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
