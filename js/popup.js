const KEY_CODE = 27;
const textarea = document.querySelector('textarea');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadFile = document.querySelector('#upload-file');
const bodyDoc = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const imgPreview = imgUploadPreview.querySelector('img');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyDoc.classList.remove('modal-open');
  uploadFile.value = '';
  scaleControlValue.value  = '';
  imgUploadPreview.style.transform = '';
  imgPreview.style.filter = '';
  imgPreview.className = '';
  imgUploadPreview.classList.add('img-upload__preview');
  textHashtags.classList.remove('error__text');
  textHashtags.value = '';
  textDescription.classList.remove('error__text');
  textDescription.value = '';
  textDescription.setCustomValidity('');
  textHashtags.setCustomValidity('');
  textDescription.reportValidity();
  textHashtags.reportValidity();
  imgUploadForm.reset();
};

const onEscModalPress = (evt) => {
  if (evt.keyCode === KEY_CODE) {
    closeModal();
    document.removeEventListener('keydown', onEscModalPress);
  }
};

const onCloseModalClick = () => {
  closeModal();
  document.removeEventListener('keydown', onEscModalPress);
};
uploadCancel.addEventListener('click', onCloseModalClick);

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  imgUploadOverlay.classList.remove('hidden');
  bodyDoc.classList.add('modal-open');
  scaleControlValue.value = '100%';
  effectLevelSlider.classList.add('hidden');
  document.addEventListener('keydown', onEscModalPress);
};
uploadFile.addEventListener('input', onUploadFileChange);

const onDocumentPress = (evt) => {
  if (evt.keyCode === KEY_CODE) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};
textarea.addEventListener('keydown', onDocumentPress);
textHashtags.addEventListener('keydown', onDocumentPress);

export {onCloseModalClick};
