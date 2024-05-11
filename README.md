# Problem Statement

In a globalized world, effective communication across languages is crucial. However, language barriers often hinder seamless interaction. To address this issue, we aim to develop a web application that provides real-time translation services from English to Sanskrit and English to Hindi. Additionally, the application will incorporate text-to-speech and speech-to-text features to enhance accessibility and user experience.

[(Doc link)](https://docs.google.com/document/d/1Ohi__EgosyaZY7Cl83grHvJWuEvrB9yvivgiDjfuzBQ/edit?usp=sharing)

![language-problem](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10FfW4ofgBwhTgm_Uvw7hiE1pJx-KF2ojXEykn_cDjg&s)

# Solution Approach

Our approach tackles the challenge of building a website that translates between English, Sanskrit, Hindi and Hinglish. It emphasizes overcoming limitations of current translation tools by proposing a character-level language model with a state-of-the-art Transformer architecture. We will train this model to understand complex grammar and translate text or speech input into the desired language (text or speech output).
We propose the development of a language translator web application equipped with advanced features to facilitate cross-language communication. The application will be built using the NodeJS web framework for seamless deployment of machine learning models.

![different-language](https://talents.blr1.digitaloceanspaces.com/1703411005/i-can-translate-englishnepalifrenchkorean-and-hindi-respectively.png)

1. **Data Acquisition and Preprocessing:**

   - Gather English to Sanskrit and English to Hindi translation datasets.
   - Preprocess the datasets to clean and normalize the text.

   > Sources: Huggingface, Kaggle

2. **Model Training:**
   We will train a character-level language model based on the Transformer architecture to understand the grammatical intricacies of each language. The Transformer will have multiple encoder and decoder blocks. The decoder will use the output from the encoder along with the text generated till now and predict the next character in the required language. The self attention mechanism will help in translation longer texts and still give accurate results.

   > Libraries used:

   > - PyTorch
   > - PyTorch.nn
   > - Numpy
   > - pandas

3. **NodeJS Web Application Development:**

   - Develop the front-end of the web application using HTML, CSS, and JavaScript for user interaction and interface design.
   - Integrate as the backend framework to handle HTTP requests and responses. We used ExpressJS.
   - Implement routes for translation requests and serving the web pages.

4. **Integration of Machine Learning Models:**

   - Integrate the trained translation models into the NodeJS application.
   - Implement translation functionality that takes input text in input language and outputs translations in Sanskrit, Hindi, Hinglish or English.
   - The GPT model will be integrated into a user-friendly website using NodeJS in the backend and HTML in the client-side.The model will be converted to “.pt” file.

5. **Text-to-Speech (TTS) Integration:**

   - Integrate a text-to-speech system to convert translated text into spoken words.
   - Utilize libraries like Google Text-to-Speech or Mozilla TTS for high-quality audio output.

6. **Speech-to-Text (STT) Integration:**

   - Implement a speech-to-text feature to allow users to input text via speech.
   - Utilize libraries like SpeechRecognition or APIs like Google Cloud Speech-to-Text for accurate speech recognition.

7. **Testing and Deployment:**
   - Thoroughly test the application to ensure accurate translations and proper functioning of text-to-speech and speech-to-text features.
   - Deploy the Flask application to a web server, ensuring scalability and accessibility to users worldwide.

By implementing this solution, we aim to bridge the language gap and provide users with a convenient and efficient tool for cross-language communication, enhancing global connectivity and collaboration.

This solution leverages Flask for its simplicity and flexibility in deploying machine learning models, ensuring a smooth user experience and efficient translation services.

![cat-dog](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMH_Ptw-tS0FH_Vup35-JX4-m8occQ66Bsuos21rMufw&s)

# Workflow

1. [Data Acquisition and Preprocessing](#data-acquisition-and-preprocessing)
2. [Model Training](#model-training)
3. [NodeJS Web Application Development](#nodejs-web-application-development)
4. [Integration of Machine Learning Models](#integration-of-machine-learning-models)
5. [Text-to-Speech (TTS) Integration](#text-to-speech-tts-integration)
6. [Speech-to-Text (STT) Integration](#speech-to-text-stt-integration)
7. [Testing and Deployment](#testing-and-deployment)



