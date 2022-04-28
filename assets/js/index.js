import cryptography from './cryptography.js';
import Alert from './Alert.js';
import isAccent from './isAccent.js';
import toggleLanguage from './language.js';

let lang = 'ptBR'; 
let textResult = null;

const encryptForm = document.querySelector('.encrypt');
const message = document.getElementById('message');
const buttonEncrypt = document.querySelector('.btn-encrypt');
const buttonDecrypt = document.querySelector('.btn-decrypt');
const buttonCopy = document.querySelector('.btn-copy');
const onboardMessage = document.querySelector('.content-result');
const buttonsToggle = document.querySelectorAll('.button-toggle');

const secret = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat'
}

window.onload = () => {

  let timer = null;
  buttonEncrypt.onclick = handleEncrypt
  buttonDecrypt.onclick = handleDecrypt;
  buttonCopy.onclick = handleCopy;
  message.addEventListener('keydown', event => {

    clearTimeout(timer);

    timer = setTimeout(() => {
      const content = event.target.value;
      console.log(content)
      if(isAccent(content)){
        encryptForm.classList.add('error')
        encryptForm.querySelectorAll('.btn').forEach(el => el.classList.add('btn-disabled'))
      }else{
        encryptForm.classList.remove('error')
        encryptForm.querySelectorAll('.btn').forEach(el => el.classList.remove('btn-disabled'))
      }

      if(content.trim() === ''){
        
      }
      
    }, 500)
      
  })

  const onboardHeight = onboardMessage.getBoundingClientRect().height;
  const headerHeight = document.querySelector('.header').getBoundingClientRect().height

  document.documentElement.style.setProperty("--header",`${headerHeight}px`);
  document.documentElement.style.setProperty("--onboarding",`${onboardHeight}px`);

  console.log("em px ?",onboardHeight)
}


function handleEncrypt(){
  const response =  cryptography.encrypt(message.value, secret,lang);
  if(response.error === null){
    textResult = response.message;

    writeContent(response.message)
    if(lang === 'ptBR'){
      Alert('Texto encriptado', response.state, 'success');
    }else{
      Alert('Text encrypt', response.state, 'success');
    }

  }else{
    if(lang === 'ptBR'){
      Alert(response.state, response.error, 'error');
    }else{
      Alert(response.state, response.error, 'error');
    }

  }
}

function handleDecrypt(){
  const response = cryptography.decrypt(message.value, secret,lang)
  if(response.error === null){
    textResult = response.message;

    writeContent(response.message)

    if(lang === 'ptBR'){
      Alert('Texto decriptado', response.state, 'success');
    }else{
      Alert('Text decrypt', response.state, 'success');
    }

  }else{
    if(lang === 'ptBR'){
      Alert(response.state, response.error, 'error');
    }else{
      Alert(response.state, response.error, 'error');
    }

  }
}

function handleCopy(){
  if(textResult !== null){
    copyContent(textResult)
  }
}

function writeContent(content){
  const onboardElementText = onboardMessage.querySelector('.message');

  onboardMessage.classList.add('showContent')
  if(typeof onboardElementText === 'undefined' || onboardElementText === null){

    const p = document.createElement('p');
    p.className = 'message'
    p.textContent = content;

    const title = onboardMessage.querySelector('h3')
    title.style.display = 'none'
    onboardMessage.appendChild(p)

    return;
  }
  
  onboardElementText.textContent = content;
}

async function copyContent(content){
  await navigator.clipboard.writeText(content);
  if(lang === 'ptBR'){
    Alert('Texto copiado!', "A mensagem foi copiado com sucesso", 'success');
  }else{
    Alert('Copied text!', "The message was successfully copied", 'success');
  }

}

buttonsToggle.forEach((toggle) => {

  if(toggle.dataset.type === 'lang'){
    const toggleOptions = toggle.querySelectorAll('.option');
    toggleOptions.forEach(e => e.onclick = () => handleToggleLanguage(toggle))
  }

  if(toggle.dataset.type === 'theme'){
    const toggleOptions = toggle.querySelectorAll('.option');
    toggleOptions.forEach(e => e.onclick = () => handleToggleThem(toggle))
  }
})

function handleToggleThem(element){
  if(element.dataset.selected === 'default'){
    element.dataset.selected = 'secondary';

    document.querySelector('body').classList.add('light');
    document.querySelector('body').classList.remove('dark');

  }else{
    element.dataset.selected = 'default'
    document.querySelector('body').classList.remove('light');
    document.querySelector('body').classList.add('dark');
  }
}

function handleToggleLanguage(element){
    console.log(element)
  if(element.dataset.selected === 'default'){
    element.dataset.selected = 'secondary'
    toggleLanguage('en')
    lang = 'en'
  }else{
    element.dataset.selected = 'default'
    toggleLanguage('ptBR')
    lang = 'ptBR';
  }
}