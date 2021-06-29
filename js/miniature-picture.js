import {getArrayObject} from './data.js';
import {getBigPictures} from './big-picture.js';

//import {getSocialComment} from './big-picture.js';

const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const socialCommentCount = document.querySelector('.social__comment-count');
const bigPicture = document.querySelector('.big-picture');
const QUANTITY_OBJECTS = 25;
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const similarPictures = getArrayObject(QUANTITY_OBJECTS);

const createSimilarFotos = (foto) => {
  const similarListFragment = document.createDocumentFragment();
  foto.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);

    const getClickMiniature = () => {
      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      body.classList.add('modal-open');
      getBigPictures({url, likes, comments, description});
    };
    pictureElement.addEventListener('click', getClickMiniature);
  });
  return similarListFragment;

};
pictures.appendChild(createSimilarFotos(similarPictures));

const getCloseBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};
bigPictureCancel.addEventListener('click', getCloseBigPicture);
const getEscClosePicture = (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
};

document.addEventListener('keydown', getEscClosePicture);
