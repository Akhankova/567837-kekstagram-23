import {getBigPictures} from './big-picture.js';
import {debounce} from './util.js';


const RERENDER_DELAY = 500;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterDefault = document.querySelector('#filter-default');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


let similarPicturesCopy = [];
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
    };
    pictureElement.addEventListener('click', getClickMiniature);
  });
  pictures.appendChild(similarListFragment);
};

const createSimilarFotos = (similarPictures) => {
  getPictures(similarPictures);
  similarPicturesCopy = similarPictures.slice();
};


const getByDefault = debounce(() => {
  filterDefault.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  const similarPicturesDefault = similarPicturesCopy;
  getPictures(similarPicturesDefault);
}, RERENDER_DELAY);
filterDefault.addEventListener('click', getByDefault);


const sortByDiscussed= debounce(() => {
  filterDiscussed.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDefault.classList.remove('img-filters__button--active');
  let  similarPicturesDiscussed = similarPicturesCopy.slice();
  similarPicturesDiscussed = similarPicturesDiscussed.sort((first, second) => first.comments.length < second.comments.length ? 1 : -1);
  getPictures(similarPicturesDiscussed);

}, RERENDER_DELAY);
filterDiscussed.addEventListener('click', sortByDiscussed);

const sortByRandom = debounce(() => {
  filterRandom.classList.add('img-filters__button--active');
  filterDefault.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  const similarPictureCopie = similarPicturesCopy.slice();
  const shuffle = (arr) => { arr.sort(() => Math.round(Math.random() * 100) - 50);};
  shuffle(similarPictureCopie);
  similarPictureCopie.slice(0, 10);
  getPictures(similarPictureCopie.slice(0, 10));
}, RERENDER_DELAY);
filterRandom.addEventListener('click', sortByRandom);


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
