const text = {
  en: {
    textareaPlaceholder: 'Type your message here...',
    textInfo: 'Only lowercase letters and no accents.',
    buttonEncrypt: 'Encrypt',
    buttonDecrypt: 'Decrypt',
    resultPlaceholder: 'Enter a text you want to encrypt or decrypt.',
    buttonCopy: "Copy text"
  },
  ptBR: {

    textareaPlaceholder: 'Digite sua mensagem aqui...',
    textInfo: 'Apenas letras minúsculas e sem acento.',
    buttonEncrypt: 'Criptografar',
    buttonDecrypt: 'Descriptografar',
    resultPlaceholder: 'Digite um texto que você deseja criptografar ou descriptografar.',
    buttonCopy: "Copiar texto"
  }
}


function toggleLanguage(lang){
  if(typeof text[lang] === 'undefined') return null;

  const language = text[lang];

  const message = document.getElementById('message');
  const buttonEncrypt = document.querySelector('.btn-encrypt');
  const buttonDecrypt = document.querySelector('.btn-decrypt');
  const buttonCopy = document.querySelector('.btn-copy');
  const onboardMessage = document.querySelector('.only-result-text');
  const infoText = document.querySelector('.info-text');


  message.placeholder = language.textareaPlaceholder;
  buttonCopy.textContent = language.buttonCopy
  buttonEncrypt.textContent = language.buttonEncrypt
  buttonDecrypt.textContent = language.buttonDecrypt
  onboardMessage.textContent = language.resultPlaceholder;
  infoText.textContent = language.textInfo
  console.log(language.textareaPlaceholder)
}

export default toggleLanguage;