import './miniature-picture.js';
import './big-picture.js';
import './api.js';
import './upload.js';
import './popup.js';
import './filter.js';
import {createSimilarFotos} from './miniature-picture.js';
import {setUserFormSubmit} from './form.js';
import {onCloseModalClick} from './popup.js';
import {getData} from './api.js';


getData((fotos) => {
  createSimilarFotos(fotos);
});

setUserFormSubmit(onCloseModalClick);

