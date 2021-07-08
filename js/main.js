//import {getArrayObject} from './data.js';
import './miniature-picture.js';
import './big-picture.js';
import {createSimilarFotos} from './miniature-picture.js';
import {setUserFormSubmit} from './form.js';
import {getCloseUploadCancel} from './popup.js';
import {getData} from './api.js';

const QUANTITY_GENERATED_OBJECTS = 25;

//getArrayObject(QUANTITY_GENERATED_OBJECTS);
  getData((fotos) => {
    createSimilarFotos(fotos);
  });

setUserFormSubmit(getCloseUploadCancel);
//export {getArrayObject};
