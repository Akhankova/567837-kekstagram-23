import {onCloseModalClick} from './popup.js';

const KEY_CODE = 27;
const documentBody = document.querySelector('body');

const getErrorText = () => {
  const errorTextTempl = document.querySelector('#error').content;
  const errorElement = errorTextTempl.cloneNode(true);
  documentBody.appendChild(errorElement);
  onCloseModalClick();

  const error = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  const getCloseError = () => {
    error.classList.add('hidden');
    error.remove();
  };
  const getEscCloseError = (evt) => {
    if (evt.keyCode === KEY_CODE) {
      evt.preventDefault();
      error.classList.add('hidden');
      error.remove();
    }
  };
  const getCloseErrorDisplayClick = (evt) => {
    if (evt.target === error) {
      error.classList.add('hidden');
      error.remove();
    }
  };
  document.addEventListener('keydown', getEscCloseError);
  document.addEventListener('click', getCloseErrorDisplayClick);
  errorButton.addEventListener('click', getCloseError);
};


const getSuccessText = () => {
  const successTextTempl = document.querySelector('#success').content;
  const successElement = successTextTempl.cloneNode(true);
  documentBody.appendChild(successElement);
  onCloseModalClick();

  const success = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');

  const onDocumentPress = (evt) => {
    if (evt.keyCode === KEY_CODE) {
      evt.preventDefault();
      success.classList.add('hidden');
      success.remove();
      document.removeEventListener('keydown', onDocumentPress);
    }
  };
  const onDocumentClick = (evt) => {
    if (evt.target === success) {
      success.classList.add('hidden');
      success.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentPress);
    }
  };
  const onCloseSuccessClick = () => {
    success.classList.add('hidden');
    success.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentPress);
  };
  document.addEventListener('keydown', onDocumentPress);
  document.addEventListener('click', onDocumentClick);
  successButton.addEventListener('click', onCloseSuccessClick);
};

const getErrorServerElement = () => {
  const errorElementServer = document.createElement('section');
  errorElementServer.classList.add('error__server-text');
  const serverElementText = document.createElement('p');
  errorElementServer.classList.add('hidden');
  serverElementText.textContent = 'Произошла ошибка запроса';
  serverElementText.style.fontSize = '48pt';
  serverElementText.style.color = 'red';
  errorElementServer.appendChild(serverElementText);
  documentBody.appendChild(errorElementServer);
  const getPopupErrorServer = () => {
    errorElementServer.classList.remove('hidden');
  };
  getPopupErrorServer();
};

export {getErrorText, getSuccessText, getErrorServerElement};

