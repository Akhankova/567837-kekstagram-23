import {getBigPictures} from './big-picture.js';

const KEY_CODE = 27;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
let similarPicturesCopy = [];

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onEscPress = (evt) => {
  if (evt.keyCode === KEY_CODE) {
    closeBigPicture();
    document.removeEventListener('keydown', onEscPress);
  }
};

const getPictures = (similarPictures) => {
  imgFilters.classList.remove('img-filters--inactive');
  const pictureLink = document.querySelectorAll('.picture');
  pictureLink.forEach((picture) => picture.remove());
  const similarListFragment = document.createDocumentFragment();
  similarPictures.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);

    const onMiniatureClick = () => {
      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');
      getBigPictures({url, likes, comments, description});
      document.addEventListener('keydown', onEscPress);
    };
    pictureElement.addEventListener('click', onMiniatureClick);
  });
  pictures.appendChild(similarListFragment);
};

const createSimilarFotos = (similarPictures) => {
  getPictures(similarPictures);
  similarPicturesCopy = similarPictures.slice();
};

const onCloseClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onEscPress);
};
bigPictureCancel.addEventListener('click', onCloseClick);


export {createSimilarFotos, getPictures, similarPicturesCopy};
