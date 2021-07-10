//import {getErrorText} from './util.js';
//import {getSuccessText} from './util.js';
import {getErrorServerElement} from './util.js';
const imgFilters = document.querySelector('.img-filters');

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((fotos) => {
      onSuccess(fotos),
      imgFilters.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      getErrorServerElement();
    });
};

const sendData = (getSuccessText, getErrorText, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        getSuccessText();
      } else {
        getErrorText();
      }
    })
    .catch(() => {
      getErrorText();
    });
};

export {getData, sendData};
