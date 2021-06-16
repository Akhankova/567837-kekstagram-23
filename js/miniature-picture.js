import {getArrayObject} from './data.js';

const QUANTITY_OBJECTS = 25;
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const similarPictures = getArrayObject(QUANTITY_OBJECTS);

const createSimilarFotos = () => {
  const similarListFragment = document.createDocumentFragment();
  similarPictures.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);
  });
  return similarListFragment;
};

pictures.appendChild(createSimilarFotos());


