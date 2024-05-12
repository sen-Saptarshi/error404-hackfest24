import torch
import torch.nn as nn
import torch.nn.functional as F
import pandas as pd

# -------
from Transformer import Transformer
from functions_training import translate
from objects_for_training import *
# -------

device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

if __name__=="__main__":
    max_sequence_length = 200
    START_TOKEN = '<START>'
    PADDING_TOKEN = '<PADDING>'
    END_TOKEN = '<END>'
    import pandas as pd
    data1 = pd.read_csv('vocabulary/english_final_vocab_for_eng_sans.csv').values
    data2 = pd.read_csv('vocabulary/sanskrit_final_vocab_for_eng_sans.csv').values
    english_vocabulary = []
    kannada_vocabulary = []
    for i in data1:
        english_vocabulary.append(i[1])
    for i in data2:
        kannada_vocabulary.append(i[1])    
    print(kannada_vocabulary)
    # print(len(english_vocabulary))
    index_to_kannada = {k:v for k,v in enumerate(kannada_vocabulary)}
    kannada_to_index = {v:k for k,v in enumerate(kannada_vocabulary)}
    index_to_english = {k:v for k,v in enumerate(english_vocabulary)}
    english_to_index = {v:k for k,v in enumerate(english_vocabulary)}

    d_model = 512
    batch_size = 30
    ffn_hidden = 2048
    num_heads = 8
    drop_prob = 0.1
    num_layers = 1
    max_sequence_length = 200
    kn_vocab_size = len(kannada_vocabulary)
    transformer = Transformer(d_model,
                          ffn_hidden,
                          num_heads,
                          drop_prob,
                          num_layers,
                          max_sequence_length,
                          kn_vocab_size,
                          english_to_index,
                          kannada_to_index,
                          START_TOKEN,
                          END_TOKEN,
                          PADDING_TOKEN)
    
    transformer.load_state_dict(torch.load('./models/v3_es_5e_st.pt', map_location=device))
    transformer.eval()

    s = input()
    try:
        print(translate(s, transformer)[:-5])
    except:
        print("Please enter a valid english sentence")