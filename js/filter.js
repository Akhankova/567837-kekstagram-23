import {debounce} from './utils/debounce.js';
import {getPictures, similarPicturesCopy} from './miniature-picture.js';

const RERENDER_DELAY = 500;
const NUMBER_FOR_MATH_RANDOM = 100;
const NUMBER_FOR_MATH_ROUND = 50;
const ARRAY_LENGTH = 10;
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterDefault = document.querySelector('#filter-default');
const getShuffle = (arr) => { arr.sort(() => Math.round(Math.random() * NUMBER_FOR_MATH_RANDOM) - NUMBER_FOR_MATH_ROUND);};

const getSortByDefault = debounce(() => {
  filterDefault.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  const similarPicturesDefault = similarPicturesCopy;
  getPictures(similarPicturesDefault);
}, RERENDER_DELAY);
filterDefault.addEventListener('click', getSortByDefault);

const getSortByDiscussed = debounce(() => {
  filterDiscussed.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDefault.classList.remove('img-filters__button--active');
  let similarPicturesDiscussed = similarPicturesCopy.slice();
  similarPicturesDiscussed = similarPicturesDiscussed.sort((first, second) => first.comments.length < second.comments.length ? 1 : -1);
  getPictures(similarPicturesDiscussed);
}, RERENDER_DELAY);
filterDiscussed.addEventListener('click', getSortByDiscussed);

const getSortByRandom = debounce(() => {
  filterRandom.classList.add('img-filters__button--active');
  filterDefault.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  const similarPictureCopie = similarPicturesCopy.slice();
  getShuffle(similarPictureCopie);
  getPictures(similarPictureCopie.slice(0, ARRAY_LENGTH));
}, RERENDER_DELAY);
filterRandom.addEventListener('click', getSortByRandom);

