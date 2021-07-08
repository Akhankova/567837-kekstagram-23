const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadFile = document.querySelector('#upload-file');
const bodyDoc = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const imgPreview = imgUploadPreview.querySelector('img');
const imgUploadForm = document.querySelector('.img-upload__form');

const getCloseUploadCancel = () => {
  //evt.preventDefault();
  imgUploadOverlay.classList.add('hidden');
  bodyDoc.classList.remove('modal-open');
  uploadFile.value = '';
  scaleControlValue.value  = '';
  imgUploadPreview.style.transform = '';
  imgPreview.style.filter = '';
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add('img-upload__preview');
  imgUploadForm.reset();
};
uploadCancel.addEventListener('click', getCloseUploadCancel);

export {getCloseUploadCancel};
