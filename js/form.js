
import './nouislider/nouislider.js';
import './slider.js';
import {sendData} from './api.js';
import {getSuccessText} from './util.js';
import {getErrorText} from './util.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyDoc = document.querySelector('body');
const textarea = document.querySelector('textarea');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const textHashtags = document.querySelector('.text__hashtags');
const scaleControlValue = document.querySelector('.scale__control--value');
const COMMENT_LENGTH = 140;
const textDescription = document.querySelector('.text__description');
const scaleControlSmall = document.querySelector('.scale__control--smaller');
const scaleControlBig = document.querySelector('.scale__control--bigger');
const imgUploadForm = document.querySelector('.img-upload__form');

const getInputUploadFile = (evt) => {
  evt.preventDefault();
  imgUploadOverlay.classList.remove('hidden');
  bodyDoc.classList.add('modal-open');
  scaleControlValue.value = '100%';
  effectLevelSlider.classList.add('hidden');
};
uploadFile.addEventListener('input', getInputUploadFile);

const getEscCloseUploadCancel = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    bodyDoc.classList.remove('modal-open');
    uploadFile.value = '';
    scaleControlValue.value  = 100;
    imgUploadPreview.style.transform = '';
    imgPreview.style.filter = '';
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add('img-upload__preview');
    imgUploadForm.reset();
  }
};
document.addEventListener('keydown', getEscCloseUploadCancel);

const getЕextDescriptionFocus = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};
textarea.addEventListener('keydown', getЕextDescriptionFocus);
textHashtags.addEventListener('keydown', getЕextDescriptionFocus);


scaleControlValue.value = '100%';
let controlValue = 100;
const getPictureBig = () => {
  if (controlValue < 100){
    controlValue  += 25;
    scaleControlValue.value = `${controlValue}${'%'}`;
    imgUploadPreview.style.transform = `scale(${controlValue/100})`;
  }
};
const getPictureSmall = () => {
  if (controlValue > 25){
    controlValue -= 25;
    scaleControlValue.value = `${controlValue}${'%'}`;
    imgUploadPreview.style.transform = `scale(${controlValue/100})`;
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
  if (hashtags.length > 5 ) {
    textHashtags.setCustomValidity('Hельзя указать больше пяти хэш-тегов');
    textHashtags.classList.add('error__text');
  }  else if (hashtags.length < 1) {
    textHashtags.setCustomValidity('');
    textHashtags.classList.remove('error__text');
  }  else {textHashtags.setCustomValidity('');
    textHashtags.classList.remove('error__text');
  }
  textHashtags.reportValidity();

  for (let index=0; index<hashtags.length; index++) {
    if (hashtags[index].length < 1) {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('error__text');
    } else if (re.test(hashtags[index]) === false) {
      textHashtags.setCustomValidity('Неверный параметр');
      textHashtags.classList.add('error__text');
    } else if (hashtags[index].length > 20) {
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
    //const formData = new FormData(evt.target);
    sendData(
      () => getSuccessText(),
      () => getErrorText(),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
