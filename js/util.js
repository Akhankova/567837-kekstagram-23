import {getCloseUploadCancel} from './popup.js';

const INVALID_VALUE_ERROR_TEXT = 'Максимальное значение не должно быть меньше или равно минимальному значению';
const NEGATIVE_VALUE_ERROR_TEXT = 'Диапазон может быть только положительный';
const MIN_QUANTITY_COMMENTS = 1;
const MAX_QUANTITY_COMMENTS = 2;
const KEY_CODE = 27;
const body = document.querySelector('body');


const getRandomValue = function (minValue, maxValue) {
  if (minValue >= maxValue) {
    return INVALID_VALUE_ERROR_TEXT;
  }
  if (minValue < 0 || maxValue < 0) {
    return NEGATIVE_VALUE_ERROR_TEXT;
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

const getRandomArrayElement = (elements) => elements[getRandomValue(0, elements.length - 1)];

const commentIdNumbers = [];
const getRandomNumberIdComments = (min, max) => {
  const number = getRandomValue(min, max);
  if (commentIdNumbers.includes(number)) {
    return getRandomNumberIdComments(min, max);
  } else {
    commentIdNumbers.push(number);
    return number;
  }
};
const creatMessage = (elements) => {
  const numberOfMessage = getRandomValue(MIN_QUANTITY_COMMENTS, MAX_QUANTITY_COMMENTS);
  let messageText = getRandomArrayElement(elements);
  if (numberOfMessage === 2) {
    messageText += getRandomArrayElement(elements);
  }
  return messageText;
};
const creatAvatar = (maxValueAvatar, index) => {
  if (index > maxValueAvatar && !(index % maxValueAvatar === 0)) {
    index = index % maxValueAvatar;
  } else if (index % maxValueAvatar === 0) {
    index = maxValueAvatar;
  }
  return index;
};

const getErrorText = () => {
  const errorTextTempl = document.querySelector('#error').content;
  const errorElement = errorTextTempl.cloneNode(true);
  body.appendChild(errorElement);
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
  body.appendChild(successElement);
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
  body.appendChild(errorElementServer);
  const getPopupErrorServer = () => {
    errorElementServer.classList.remove('hidden');
  };
  getPopupErrorServer();
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export {getRandomValue, getRandomArrayElement, getRandomNumberIdComments, creatMessage, creatAvatar, getErrorText, getSuccessText, getErrorServerElement, debounce};

