//import {getArrayObject} from './data.js';
import './miniature-picture.js';
import './big-picture.js';
import {createSimilarFotos} from './miniature-picture.js';
import {setUserFormSubmit} from './form.js';
import {getCloseUploadCancel} from './popup.js';

const QUANTITY_GENERATED_OBJECTS = 25;

//getArrayObject(QUANTITY_GENERATED_OBJECTS);

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((fotos) => {
    createSimilarFotos(fotos);
  });

  setUserFormSubmit(getCloseUploadCancel);
//export {getArrayObject};
