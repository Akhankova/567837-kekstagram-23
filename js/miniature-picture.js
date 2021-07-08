import {getBigPictures} from './big-picture.js';

const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createSimilarFotos = (similarPictures) => {
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
    };
    pictureElement.addEventListener('click', getClickMiniature);
  });
  pictures.appendChild(similarListFragment);
};

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
export {createSimilarFotos};
