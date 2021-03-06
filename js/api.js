import {getErrorServerElement} from './util.js';

const GET_DATA_ADDRESS = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_DATA_ADDRESS = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(GET_DATA_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      getErrorServerElement();
    });
};

const sendData = (getSuccessText, getErrorText, body) => {
  fetch(
    SEND_DATA_ADDRESS,
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
