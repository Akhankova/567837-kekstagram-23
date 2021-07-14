import './miniature-picture.js';
import './big-picture.js';
import './api.js';
import './upload.js';
import {createSimilarFotos} from './miniature-picture.js';
import {setUserFormSubmit} from './form.js';
import {getCloseUploadCancel} from './popup.js';
import {getData} from './api.js';


getData((fotos) => {
  createSimilarFotos(fotos);
});

setUserFormSubmit(getCloseUploadCancel);

