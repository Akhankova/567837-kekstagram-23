import './nouislider/nouislider.js';

const RANGE_MIN = 0;
const RANGE_MAX = 1;
const RANGE_STEP = 0.1;
const RANGE_START = 0;
const RANGE_CONNECT = 'lower';
const VALUE_TO_FIXED_MIN = 0;
const VALUE_TO_FIXED_MAX = 1;
const EMPTY_STRING = ' ';
const EffectStep = {
  NONE: 0,
  CHROME: 0.1,
  SEPIA: 0.1,
  MARVIN: 1,
  PHOBOS: 0.1,
  HEAT: 0.1,
};

const EffectMax = {
  NONE: 0.1,
  CHROME: 1,
  SEPIA: 1,
  MARVIN: 100,
  PHOBOS: 3,
  HEAT: 3,
};

const EffectMin = {
  NONE: 0,
  CHROME: 0,
  SEPIA: 0,
  MARVIN: 0,
  PHOBOS: 0,
  HEAT: 1,
};
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadForm = document.querySelector('.img-upload__form');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgPreview = imgUploadPreview.querySelector('img');

let effectValue = EMPTY_STRING;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: RANGE_MIN,
    max: RANGE_MAX,
  },
  start: RANGE_START,
  step: RANGE_STEP,
  connect: RANGE_CONNECT,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(VALUE_TO_FIXED_MIN);
      }
      return value.toFixed(VALUE_TO_FIXED_MAX);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const getCheck = (evt) => {
  if (evt.target.name === 'effect')  {
    effectLevelSlider.classList.remove('hidden');
    imgPreview.className = EMPTY_STRING;
    imgPreview.classList.add(`effects__preview--${evt.target.value}`);
    effectValue = evt.target.value;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: EffectMin[evt.target.value.toUpperCase()],
        max: EffectMax[evt.target.value.toUpperCase()],
      },
      start: EffectMax[evt.target.value.toUpperCase()],
      step: EffectStep[evt.target.value.toUpperCase()],
    });
    if (evt.target.value === 'none') {
      imgPreview.style.filter = EMPTY_STRING;
      effectLevelSlider.classList.add('hidden');
    }
  }
};
imgUploadForm.addEventListener('change', getCheck);

effectLevelSlider.noUiSlider.on('update', (__, handle, unencoded) => {
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
export {EMPTY_STRING};
