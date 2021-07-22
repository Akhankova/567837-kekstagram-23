
import './nouislider/nouislider.js';
import './slider.js';
import {sendData} from './api.js';
import {getSuccessText} from './util.js';
import {getErrorText} from './util.js';

const MIN_VALUE = 0;
const CONTROL_VALUE_MIN = 25;
const CONTROL_VALUE_MAX = 100;
const COMMENT_LENGTH = 140;
const HASHTAG_LANGTH = 20;
const HASHTAGS_LANGTH = 5;
const HASHTAG_LANGTH_MIN = 2;
const MIN_LENGTH = 0;
const HASHTAG_LANGTH_VALUE = 1;
const REGULAR_EXPRESSION = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('img');
const textHashtags = document.querySelector('.text__hashtags');
const scaleControlValue = document.querySelector('.scale__control--value');
const textDescription = document.querySelector('.text__description');
const scaleControlSmall = document.querySelector('.scale__control--smaller');
const scaleControlBig = document.querySelector('.scale__control--bigger');
const imgUploadForm = document.querySelector('.img-upload__form');
let CONTROL_VALUE = 100;

const onDecreaseButtonClick = () => {
  if (CONTROL_VALUE > CONTROL_VALUE_MIN){
    CONTROL_VALUE -= CONTROL_VALUE_MIN;
    scaleControlValue.value = `${CONTROL_VALUE}%`;
    imgPreview.style = `transform: scale(${CONTROL_VALUE/100})`;
  }
};
scaleControlSmall.addEventListener('click', onDecreaseButtonClick);

const onZoomButtonClick = () => {
  if (CONTROL_VALUE < CONTROL_VALUE_MAX){
    CONTROL_VALUE += CONTROL_VALUE_MIN;
    scaleControlValue.value = `${CONTROL_VALUE}%`;
    imgPreview.style = `transform: scale(${CONTROL_VALUE/100})`;
  }
};
scaleControlBig.addEventListener('click', onZoomButtonClick);

const onTextDescriptionChange = (evt) => {
  evt.preventDefault();
  const textDescriptionLength = textDescription.value.length;
  if (textDescriptionLength === MIN_LENGTH) {
    textDescription.setCustomValidity('');
    textDescription.classList.remove('error__text');
  } else if (textDescriptionLength > COMMENT_LENGTH) {
    textDescription.setCustomValidity(`Длина комментария не может составлять больше ${COMMENT_LENGTH} символов`);
    textDescription.classList.add('error__text');
  } else {
    textDescription.setCustomValidity('');
    textDescription.classList.remove('error__text');
  }
  textDescription.reportValidity();
};
textDescription.addEventListener('input', onTextDescriptionChange);

const onTextHashtagChange = (evt) => {
  evt.preventDefault();
  const hashtagArrayIncl = [];
  const hashtag = textHashtags.value;
  const textHashtagToUp = hashtag.toLowerCase();
  const hashtags = textHashtagToUp.split(' ');
  if (hashtags.length > HASHTAGS_LANGTH) {
    textHashtags.setCustomValidity('Hельзя указать больше пяти хэш-тегов');
    textHashtags.classList.add('error__text');
  }  else if (hashtags.length < HASHTAGS_LANGTH) {
    textHashtags.setCustomValidity('');
    textHashtags.classList.remove('error__text');
  }  else {textHashtags.setCustomValidity('');
    textHashtags.classList.remove('error__text');
  }
  textHashtags.reportValidity();

  hashtags.forEach((element) => {
    if (textHashtags.value === '') {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('error__text');
    } else if (hashtags[MIN_VALUE].length < HASHTAG_LANGTH_VALUE) {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('error__text');
    } else if (element.length < HASHTAG_LANGTH_MIN) {
      textHashtags.setCustomValidity('Минимальная длина хеш-тега 2 символа');
      textHashtags.classList.add('error__text');
    } else if (!REGULAR_EXPRESSION.test(element)) {
      textHashtags.setCustomValidity('Неверный параметр: Хэш-тег должен начинаться с символа #; строка после решётки не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи; максимальная длина одного хэш-тега 20 символов, включая #.');
      textHashtags.classList.add('error__text');
    } else if (element.length > HASHTAG_LANGTH) {
      textHashtags.setCustomValidity('Максимальная длина хеш-тега не более 20 символов');
      textHashtags.classList.add('error__text');
    } else if (hashtagArrayIncl.includes(element)) {
      textHashtags.setCustomValidity('Хеш-теги не должны повторяться');
      textHashtags.classList.add('error__text');
    } else if (!hashtagArrayIncl.includes(element)) {
      hashtagArrayIncl.push(element);
    } else {textHashtags.setCustomValidity('');
      textHashtags.classList.remove('error__text');
    }
    textHashtags.reportValidity();
  });
};
textHashtags.addEventListener('input', onTextHashtagChange);

const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => getSuccessText(),
      () => getErrorText(),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
