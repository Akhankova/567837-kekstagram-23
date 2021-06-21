const COMMENT_LENGTH = 140;
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyDoc = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const textarea = document.querySelector('textarea');

const getInputUploadFile = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyDoc.classList.add('modal-open');
};
uploadFile.addEventListener('input', getInputUploadFile);

const getCloseUploadCancel = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyDoc.classList.remove('modal-open');
  uploadFile.value = '';
};
uploadCancel.addEventListener('click', getCloseUploadCancel);

const getEscCloseUploadCancel = (evt) => {
  if (evt.keyCode === 27) {
    imgUploadOverlay.classList.add('hidden');
    bodyDoc.classList.remove('modal-open');
    uploadFile.value = '';
  }
};
document.addEventListener('keydown', getEscCloseUploadCancel);

const getЕextDescriptionFocus = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};
textarea.addEventListener('keydown', getЕextDescriptionFocus);
textHashtags.addEventListener('keydown', getЕextDescriptionFocus);

const getValidComment = () => {
  const textDescriptionLength = textDescription.value.length;
  if (textDescriptionLength > COMMENT_LENGTH) {
    textDescription.setCustomValidity(`Длина комментария не может составлять больше ${COMMENT_LENGTH} символов`);
  } else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
};
textDescription.addEventListener('input', getValidComment);

const getValidHashtags = () => {
  const re = /^#[A-Za-zА-Яа-я0-9]{2,19}$/;
  //const hastags = textHashtags.value;
  const abc = textHashtags.value.split(' ');
  //const hastagsArray = abc;
  let indexHashtag;
  for (let index; index <= abc.length; index ++) {
    indexHashtag = index;
  }
  if (re.test(abc) === false) {
    textHashtags.setCustomValidity('Неверный параметр, ознакомьтесь с условием создания хэштега');
  } else if (abc.length > 5) {
    textHashtags.setCustomValidity('Hельзя указать больше пяти хэш-тегов');
  } else {
    textHashtags.setCustomValidity('');
  }
  textHashtags.reportValidity();
};
textHashtags.addEventListener('input', getValidHashtags);
