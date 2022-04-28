import isAccent from "./isAccent.js";

const responseMessage = {
  'en':{
    encrypt: {
      default: 'not encrypted',
      SecretNotFound: 'secret not found',
      messageEmpty: 'empty message',
      accentErros: 'Capital letters and letters with accents are not allowed.',
      success: "Text encrypt with success",
    },
    decrypt:{
      default: 'not decrypted',
      SecretNotFound: 'secret not found',
      messageEmpty: 'empty message',
      accentErros: 'Capital letters and letters with accents are not allowed.',
      success: "Text decrypt with success",
    }
  },
  'ptBR':{
    encrypt: {
      default: 'Não encriptado',
      SecretNotFound: 'segredo invalido ou vazio',
      messageEmpty: 'A mensagem não pode estar vazia',
      accentErros: 'Apenas letras minúsculas e sem acento.',
      success: "Texto encriptado com sucesso" ,
    },
    decrypt:{
      default: 'Não decriptado',
      SecretNotFound: 'segredo invalido ou vazio',
      messageEmpty: 'A mensagem não pode estar vazia',
      accentErros: 'Apenas letras minúsculas e sem acento.',
      success: "Texto decriptado com sucesso",
    }
  }

}

const cryptography = {

  encrypt : (message = '', secret = [], lang = 'en') => {
    const response = {
      message: null,
      state: responseMessage[lang].encrypt.default,
      error: null
    }
  
    if(secret.length === 0 || secret === []){
      response.error = responseMessage[lang].encrypt.SecretNotFound;
      return response;
    }
  
    if(message.length === 0 || message === ''){
      response.error = responseMessage[lang].encrypt.messageEmpty;
      return response
    }
  
    if(isAccent(message) !== null && isAccent(message) === true){
      response.error = responseMessage[lang].encrypt.accentErros;
      return response
    }
  
    let currentMessage = message.split("");
  
    currentMessage.map((letter, index) => {
  
      if(typeof secret[letter] !== 'undefined'){
        currentMessage[index] = currentMessage[index].replaceAll(letter, secret[letter])
      }
    })

    response.message = currentMessage.join("");
    response.state = responseMessage[lang].encrypt.success;
    return response;
  } ,

  decrypt : (message = '', secret = [], lang = 'en') => {

    const response = {
      message: null,
      state: responseMessage[lang].decrypt.default,
      error: null
    }
  
    if(secret.length === 0 || secret === []){
      response.error = responseMessage[lang].decrypt.SecretNotFound;
      return response;
    }
  
    if(message.length === 0 || message === ''){
      response.error = responseMessage[lang].decrypt.messageEmpty;
      return response
    }
  
    if(isAccent(message) !== null && isAccent(message) === true){
      response.error = responseMessage[lang].decrypt.accentErros;
      return response
    }

    let currentMessage = message;

    for(let i = 0; i < Object.keys(secret).length; i++){

      if(currentMessage.includes(secret[Object.keys(secret)[i]])){
        currentMessage = currentMessage.replaceAll(secret[Object.keys(secret)[i]], Object.keys(secret)[i])

      }
    }

    response.message =  currentMessage;
    response.state = responseMessage[lang].decrypt.success;
    return response;
  }
}

export default cryptography; 