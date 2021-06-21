//import {getArrayObject} from './main.js';

const socialСomments = document.querySelector('.social__comments');
//socialСomments.innerHTML = ' ';

const getSocialComment = (comments) => {
  const similarListFragment = document.createDocumentFragment();
  comments.forEach((element) => {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    const socialCommentImg = document.createElement('img');
    socialCommentImg.src = element.comments.avatar;
    socialCommentImg.alt = element.comments.name;
    socialCommentImg.width = '35';
    socialCommentImg.height = '35';
    socialComment.appendChild(socialCommentImg);
    const socialCommentP = document.createElement('p');
    socialCommentP.classList.add('social__text');
    socialCommentP.textContent = element.comments.message;
    socialComment.appendChild(socialCommentP);
    similarListFragment.appendChild(socialComment);

  });

  socialСomments.appendChild(similarListFragment);
};

const getBigPictures = (element) => {

  const bigPictureImg = document.querySelector('.big-picture__img');
  const bigFoto = document.querySelector('.big-picture');
  bigPictureImg.querySelector('img').src = element.url;
  bigFoto.querySelector('.likes-count').textContent = element.likes;
  bigFoto.querySelector('.comments-count').textContent = element.comments.length;
  console.log(element, element.comments);
  getSocialComment(element.comments);
  bigFoto.querySelector('.social__caption').textContent = element.description;
};
export {getBigPictures};
