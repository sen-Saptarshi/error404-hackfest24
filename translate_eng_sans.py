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
    english_vocabulary = ['English',
    '<START>',
    'ấ',
    '&',
    'k',
    'r',
    'ă',
    'á',
    'ḥ',
    '1',
    'य',
    'ị',
    '“',
    'ộ',
    'ế',
    'ि',
    '_',
    'ल',
    'ī',
    '0',
    'ș',
    '4',
    '}',
    's',
    '"',
    'च',
    'š',
    ',',
    'द',
    'घ',
    '«',
    'ख',
    'फ',
    'ț',
    'थ',
    'ñ',
    'म',
    '7',
    'ặ',
    'ň',
    'v',
    '3',
    'त',
    'ë',
    'ü',
    'ध',
    'क',
    '*',
    '$',
    'o',
    'b',
    'ु',
    'ģ',
    'ऽ',
    'n',
    '(',
    '.',
    'ć',
    ')',
    'à',
    'í',
    'ɔ',
    'उ',
    'ỉ',
    '+',
    '?',
    'ę',
    'ी',
    'a',
    'ł',
    'û',
    'õ',
    'a',
    'ì',
    '#',
    'c',
    'u',
    'ụ',
    'w',
    'भ',
    '5',
    'l',
    'j',
    'e',
    'ớ',
    'श',
    'ņ',
    'ब',
    '%',
    'î',
    'é',
    'ṛ',
    'ń',
    'अ',
    'र',
    'ļ',
    'ù',
    'छ',
    '—',
    'ⓡ',
    'ö',
    'ै',
    '-',
    'ệ',
    '=',
    'ā',
    'f',
    'ě',
    'ङ',
    'ä',
    'ů',
    'ग',
    'z',
    '{',
    'व',
    '®',
    '>',
    'ķ',
    ';',
    'į',
    'i',
    ':',
    'm',
    'ṇ',
    'ṁ',
    'ः',
    'ĩ',
    '¡',
    'ञ',
    'ठ',
    'y',
    '॥',
    '’',
    '9',
    'ॄ',
    'â',
    'с',
    'ė',
    'न',
    'ű',
    'ष',
    'ृ',
    'ạ',
    '·',
    '2',
    'o',
    'ò',
    'd',
    'è',
    'ढ',
    'ç',
    '~',
    'ś',
    'q',
    '6',
    '8',
    'ह',
    ' ',
    '।',
    '•',
    'g',
    'ó',
    '‘',
    '”',
    'ư',
    'ड',
    "'",
    'ş',
    'ſ',
    'आ',
    '@',
    'ṣ',
    'ज',
    'ọ',
    'ौ',
    'ए',
    'ट',
    'ा',
    'ã',
    'इ',
    '/',
    'p',
    ']',
    't',
    'ं',
    'ħ',
    'ţ',
    'ú',
    'h',
    'å',
    '्',
    'स',
    'ď',
    'ả',
    'ı',
    'ू',
    'ū',
    'प',
    '„',
    'ो',
    '–',
    '[',
    'े',
    'x',
    'ř',
    'ण',
    '!',
    '<PADDING>',
    '<END>']
    kannada_vocabulary = ['English',
    '<START>',
    '९',
    '1',
    'M',
    'य',
    'ि',
    '_',
    'ओ',
    'ल',
    'औ',
    '4',
    's',
    '"',
    'च',
    'घ',
    ',',
    'द',
    '७',
    '«',
    'ख',
    '३',
    'फ',
    '४',
    'थ',
    'म',
    '7',
    'त',
    'ध',
    'क',
    '*',
    '¥',
    'ु',
    'ऽ',
    'ऐ',
    'ॉ',
    '(',
    '१',
    '.',
    'ज़',
    'ॠ',
    '५',
    ')',
    'उ',
    '़',
    '?',
    'ी',
    'a',
    '#',
    'c',
    'ऋ',
    'H',
    'u',
    'भ',
    'l',
    'j',
    'ँ',
    'श',
    'ब',
    'ळ',
    'अ',
    'र',
    'छ',
    'ऎ',
    '—',
    'ई',
    'ै',
    '०',
    'झ',
    '-',
    'ā',
    '॑',
    '\\',
    'f',
    '२',
    'ङ',
    '८',
    'ग',
    '॒',
    '{',
    'व',
    'ड़',
    'ऊ',
    ';',
    'ः',
    ':',
    'i',
    'ॄ',
    'ञ',
    'ठ',
    'y',
    '॥',
    '9',
    'न',
    'ॅ',
    'ष',
    'ृ',
    'ऱ',
    'ढ',
    '`',
    'ह',
    ' ',
    '।',
    '•',
    '‘',
    '”',
    '→',
    'ड',
    'Q',
    "'",
    'ऑ',
    'आ',
    'ॊ',
    '@',
    'ज',
    'ौ',
    'ए',
    'ट',
    'ा',
    'इ',
    '/',
    'p',
    ']',
    'ं',
    'ॐ',
    'h',
    'स',
    '्',
    'ू',
    '६',
    'प',
    'ो',
    'ॆ',
    '–',
    '[',
    'े',
    'ण',
    '!',
    '<PADDING>',
    '<END>']


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
    # try:
    print(translate(s, transformer)[:-5])
    # except:
        # print("Please enter a valid english sentence")