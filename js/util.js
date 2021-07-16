import {getCloseUploadCancel} from './popup.js';

const INVALID_VALUE_ERROR_TEXT = 'Максимальное значение не должно быть меньше или равно минимальному значению';
const NEGATIVE_VALUE_ERROR_TEXT = 'Диапазон может быть только положительный';
const KEY_CODE = 27;
const documentBody = document.querySelector('body');

const getRandomValue = function (minValue, maxValue) {
  if (minValue >= maxValue) {
    return INVALID_VALUE_ERROR_TEXT;
  }
  if (minValue < 0 || maxValue < 0) {
    return NEGATIVE_VALUE_ERROR_TEXT;
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

const getErrorText = () => {
  const errorTextTempl = document.querySelector('#error').content;
  const errorElement = errorTextTempl.cloneNode(true);
  documentBody.appendChild(errorElement);
  getCloseUploadCancel();

  const error = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  const getCloseError = () => {
    error.classList.add('hidden');
    error.remove();
  };
  const getEscCloseError = (evt) => {
    if (evt.keyCode === 27) {
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
  getCloseUploadCancel();

  const success = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');

  const getCloseSuccess = () => {
    success.classList.add('hidden');
    success.remove();
  };
  const getEscCloseSuccess = (evt) => {
    if (evt.keyCode === KEY_CODE) {
      evt.preventDefault();
      success.classList.add('hidden');
      success.remove();
    }
  };
  const getCloseSuccessDisplayClick = (evt) => {
    if (evt.target === success) {
      success.classList.add('hidden');
      success.remove();
    }
  };
  document.addEventListener('keydown', getEscCloseSuccess);
  document.addEventListener('click', getCloseSuccessDisplayClick);
  successButton.addEventListener('click', getCloseSuccess);
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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomValue, getErrorText, getSuccessText, getErrorServerElement, debounce};

