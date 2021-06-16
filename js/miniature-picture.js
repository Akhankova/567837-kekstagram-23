import {getArrayObject} from './data.js';
import {commentsArray} from './data.js';

const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarFotos = getArrayObject();

const similarListFragment = document.createDocumentFragment();

similarFotos.forEach((foto) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = foto.url;
  pictureElement.querySelector('.picture__likes').textContent = foto.likes;
  pictureElement.querySelector('.picture__comments').textContent = commentsArray.length;
  /* вот тут не знаю как мне получить кол-во комментариев.
по логике это должна быть длина массива, но я не уверена.
*/
  similarListFragment.appendChild(pictureElement);
});
pictures.appendChild(similarListFragment);
