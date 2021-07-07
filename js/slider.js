const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadForm = document.querySelector('.img-upload__form');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgPreview = imgUploadPreview.querySelector('img');

const effectStep = {
  none: 0,
  chrome: 0.1,
  sepia: 0.1,
  marvin: 1,
  phobos: 0.1,
  heat: 0.1,
};
const effectMax = {
  none: 0.1,
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: 3,
};
const effectMin = {
  none: 0,
  chrome: 0,
  sepia: 0,
  marvin: 0,
  phobos: 0,
  heat: 1,
};
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let effectValue = '';
const getCheck = (evt) => {
  if (evt.target.name === 'effect')  {
    effectLevelSlider.classList.remove('hidden');
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add('img-upload__preview', `effects__preview--${evt.target.value}`);
    effectValue = evt.target.value;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effectMin[evt.target.value],
        max: effectMax[evt.target.value],
      },
      start: 0,
      step: effectStep[evt.target.value],
    });

    if (evt.target.value === 'heat') {
      effectLevelSlider.noUiSlider.set(1);
    }
    if (evt.target.value === 'none') {
      imgPreview.style.filter = '';
      effectLevelSlider.classList.add('hidden');
    }
    effectLevelSlider.noUiSlider.set(0);
  }
};
imgUploadForm.addEventListener('change', getCheck);

effectLevelSlider.noUiSlider.on('update', (value, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
  const effect = {
    none: 'none',
    chrome: `grayscale(${effectLevelValue.value})`,
    sepia: `sepia(${effectLevelValue.value})`,
    marvin: `invert(${effectLevelValue.value}%)`,
    phobos: `blur(${effectLevelValue.value}px)`,
    heat: `brightness(${effectLevelValue.value})`,
  };
  imgPreview.style.filter = effect[effectValue];
});

