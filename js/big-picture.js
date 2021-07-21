import {EMPTY_STRING} from './slider.js';

const START_VALUE = 0;
const SHOWING_COMMENT_STEP = 5;
const SIZE = '35';
const socialCommentCount = document.querySelector('.social__comment-count');
const socialСomments = document.querySelector('.social__comments');
const socialСommentsLoader = document.querySelector('.comments-loader');
const bigPictureImg = document.querySelector('.big-picture__img');
const bigFoto = document.querySelector('.big-picture');
let socialCommentCopy = EMPTY_STRING;

const getCommentLi = (element) => {
  socialСomments.textContent = EMPTY_STRING;
  const socialComment = document.createElement('li');
  socialComment.classList.add('social__comment');
  const socialCommentImg = document.createElement('img');
  socialCommentImg.src = element.avatar;
  socialCommentImg.classList.add('social__picture');
  socialCommentImg.alt = element.name;
  socialCommentImg.width = SIZE;
  socialCommentImg.height = SIZE;
  socialComment.appendChild(socialCommentImg);
  const socialCommentP = document.createElement('p');
  socialCommentP.classList.add('social__text');
  socialCommentP.textContent = element.message;
  socialComment.appendChild(socialCommentP);
  socialCommentCopy = socialComment;
};

const getSocialComment = (elements) => {
  socialСommentsLoader.classList.remove('hidden');
  const similarListFragment = document.createDocumentFragment();
  const secondListFragment = document.createDocumentFragment();
  let commentsToShowCount = START_VALUE;
  let quantityComments = START_VALUE;
  const onLoadCommentsClick = () => {
    socialСomments.textContent = EMPTY_STRING;
    commentsToShowCount += SHOWING_COMMENT_STEP;
    quantityComments += SHOWING_COMMENT_STEP;
    const commentsToShow = elements.slice(0, commentsToShowCount);
    commentsToShow.forEach((element) => {
      getCommentLi(element);
      secondListFragment.appendChild(socialCommentCopy);
      if (element === elements[elements.length-1]) {
        socialСommentsLoader.classList.add('hidden');
        socialCommentCount.innerHTML = `${elements.length} из <span class='comments-count'>${elements.length}</span> комментариев`;
      } else {
        socialСommentsLoader.classList.remove('hidden');
        socialCommentCount.innerHTML = `${quantityComments} из <span class='comments-count'>${elements.length}</span> комментариев`;
      }
      return secondListFragment;
    });
    socialСomments.appendChild(secondListFragment);
  };
  onLoadCommentsClick();
  socialСommentsLoader.addEventListener('click', onLoadCommentsClick);
  socialСomments.appendChild(similarListFragment);
};

const getBigPictures = (element) => {
  bigPictureImg.querySelector('img').src = element.url;
  bigFoto.querySelector('.likes-count').textContent = element.likes;
  document.querySelector('.comments-count').textContent = element.comments.length;
  getSocialComment(element.comments);
  bigFoto.querySelector('.social__caption').textContent = element.description;
};

export {getBigPictures};
