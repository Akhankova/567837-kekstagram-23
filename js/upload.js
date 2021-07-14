const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreviewImg = imgUploadPreview.querySelector('img');
const imgUploadInput = document.querySelector('.img-upload__start input[type=file]');

imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgUploadPreviewImg.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

