import {getBigPictures} from './big-picture.js';

const KEY_CODE = 27;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
let similarPicturesCopy = [];

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const getEscClosePicture = (evt) => {
  if (evt.keyCode === KEY_CODE) {
    closeBigPicture();
    document.removeEventListener('keydown', getEscClosePicture);
  }
};

const getPictures = (similarPictures) => {
  const pictureLink = document.querySelectorAll('.picture');
  for (let index = 0; index < pictureLink.length; index ++) {
    pictureLink[index].remove();
  }
  const similarListFragment = document.createDocumentFragment();
  similarPictures.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);

    const getClickMiniature = () => {
      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');
      getBigPictures({url, likes, comments, description});
      document.addEventListener('keydown', getEscClosePicture);
    };
    pictureElement.addEventListener('click', getClickMiniature);
  });
  pictures.appendChild(similarListFragment);
};

const createSimilarFotos = (similarPictures) => {
  getPictures(similarPictures);
  similarPicturesCopy = similarPictures.slice();
};

const getCloseBigPicture = () => {
  closeBigPicture();
  document.removeEventListener('keydown', getEscClosePicture);
};
bigPictureCancel.addEventListener('click', getCloseBigPicture);

export {createSimilarFotos, getPictures, similarPicturesCopy};
