
import './nouislider/nouislider.js';
import './slider.js';
import {sendData} from './api.js';
import {getSuccessText} from './util.js';
import {getErrorText} from './util.js';

let CONTROL_VALUE = 100;
const CONTROL_VALUE_MIN = 25;
const CONTROL_VALUE_MAX = 100;
const COMMENT_LENGTH = 140;
const HASHTAG_LANGTH = 20;
const HASHTAGS_LANGTH = 5;
const HASHTAGS_LANGTH_MIN = 1;

const imgUploadPreview = document.querySelector('.img-upload__preview');
const textHashtags = document.querySelector('.text__hashtags');
const scaleControlValue = document.querySelector('.scale__control--value');
const textDescription = document.querySelector('.text__description');
const scaleControlSmall = document.querySelector('.scale__control--smaller');
const scaleControlBig = document.querySelector('.scale__control--bigger');
const imgUploadForm = document.querySelector('.img-upload__form');

const getPictureBig = () => {
  if (CONTROL_VALUE < CONTROL_VALUE_MAX){
    CONTROL_VALUE += CONTROL_VALUE_MIN;
    scaleControlValue.value = `${CONTROL_VALUE}%`;
    imgUploadPreview.style.transform = `scale(${CONTROL_VALUE/100})`;
  }
};
const getPictureSmall = () => {
  if (CONTROL_VALUE > CONTROL_VALUE_MIN){
    CONTROL_VALUE -= CONTROL_VALUE_MIN;
    scaleControlValue.value = `${CONTROL_VALUE}%`;
    imgUploadPreview.style.transform = `scale(${CONTROL_VALUE/100})`;
  }
};
scaleControlBig.addEventListener('click', getPictureBig);
scaleControlSmall.addEventListener('click', getPictureSmall);

const getValidComment = (evt) => {
  evt.preventDefault();
  const textDescriptionLength = textDescription.value.length;
  if (textDescriptionLength > COMMENT_LENGTH) {
    textDescription.setCustomValidity(`Длина комментария не может составлять больше ${COMMENT_LENGTH} символов`);
    textDescription.classList.add('error__text');
  } else {
    textDescription.setCustomValidity('');
    textDescription.classList.remove('error__text');
  }
  textDescription.reportValidity();
};
textDescription.addEventListener('input', getValidComment);

const getValidHashtags = (evt) => {
  evt.preventDefault();
  const re = /^#[A-Za-zА-Яа-я0-9]{2,19}$/;
  const hashtagArrayIncl = [];
  const hashtag = textHashtags.value;
  const textHashtagToUp = hashtag.toLowerCase();
  const hashtags = textHashtagToUp.split(' ');
  if (hashtags.length > HASHTAGS_LANGTH) {
    textHashtags.setCustomValidity('Hельзя указать больше пяти хэш-тегов');
    textHashtags.classList.add('error__text');
  }  else if (hashtags.length < HASHTAGS_LANGTH_MIN) {
    textHashtags.setCustomValidity('');
    textHashtags.classList.remove('error__text');
  }  else {textHashtags.setCustomValidity('');
    textHashtags.classList.remove('error__text');
  }
  textHashtags.reportValidity();

  for (let index = 0; index < hashtags.length; index ++) {
    if (hashtags[index].length < HASHTAGS_LANGTH_MIN) {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('error__text');
    } else if (!re.test(hashtags[index])) {
      textHashtags.setCustomValidity('Неверный параметр');
      textHashtags.classList.add('error__text');
    } else if (hashtags[index].length > HASHTAG_LANGTH) {
      textHashtags.setCustomValidity('Максимальная длина хеш-тега не более 20 символов');
      textHashtags.classList.add('error__text');
    } else if (hashtagArrayIncl.includes(hashtags[index])) {
      textHashtags.setCustomValidity('Хеш-теги не должны повторяться');
      textHashtags.classList.add('error__text');
    } else if (!hashtagArrayIncl.includes(hashtags[index])) {
      hashtagArrayIncl.push(hashtags[index]);
    } else {textHashtags.setCustomValidity('');
      textHashtags.classList.remove('error__text');
    }
    textHashtags.reportValidity();
  }
};
textHashtags.addEventListener('input', getValidHashtags);

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
