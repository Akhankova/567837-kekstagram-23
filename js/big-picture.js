//import { getRandomNumberIdComments } from "./util";

const step = 5;
const socialCommentCount = document.querySelector('.social__comment-count');
//const commentsCount = document.querySelector('.comments-count');
const socialСomments = document.querySelector('.social__comments');
const socialСommentsLoader = document.querySelector('.comments-loader');
const getSocialComment = (elements) => {
  let number = 5;
  socialСomments.innerHTML = ' ';
  const similarListFragment = document.createDocumentFragment();
  elements.forEach((element) => {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    socialComment.classList.add('hidden');
    const socialCommentImg = document.createElement('img');
    socialCommentImg.src = element.avatar;
    socialCommentImg.alt = element.name;
    socialCommentImg.width = '35';
    socialCommentImg.height = '35';
    socialComment.appendChild(socialCommentImg);
    const socialCommentP = document.createElement('p');
    socialCommentP.classList.add('social__text');
    socialCommentP.innerHTML = element.message;
    socialComment.appendChild(socialCommentP);
    similarListFragment.appendChild(socialComment);
  });
  socialСomments.appendChild(similarListFragment);
  socialСommentsLoader.classList.remove('hidden');
  for (let conter = 0; conter < step; conter++) {
    if (socialСomments.children.item(conter)) {
      socialСomments.children.item(conter).classList.add('show');
      socialСomments.children.item(conter).classList.remove('hidden');
    }
    if (socialСomments.children.item(conter) === socialСomments.children.item(socialСomments.children.length - 1)) {
      socialСommentsLoader.classList.add('hidden');
      socialCommentCount.textContent = `${socialСomments.children.length} из ${socialСomments.children.length} комментариев`;
    }
  }
  const commentShow = document.querySelectorAll('.show');
  let next = commentShow[commentShow.length-1].nextElementSibling;
  const getMoreComments = () => {
    let stepOfComment = 1;
    while (stepOfComment <= step) {
      if (next && next !== socialСomments.children[socialСomments.children.length-1]) {
        next.classList.add('show');
        next.classList.remove('hidden');
        next = next.nextElementSibling;
        stepOfComment ++;
        if (stepOfComment === step-1) {
          number += 5;
          socialCommentCount.textContent = `${number} из ${socialСomments.children.length} комментариев`;
        }
      } else if (next === socialСomments.children[socialСomments.children.length-1]) {
        next.classList.add('show');
        next.classList.remove('hidden');
        socialСommentsLoader.classList.add('hidden');
        socialCommentCount.textContent = `${socialСomments.children.length} из ${socialСomments.children.length} комментариев`;
        break;
      }else {
        break;
      }
    }
  };
  socialСommentsLoader.addEventListener('click', getMoreComments);
};
const getBigPictures = (element) => {
  const bigPictureImg = document.querySelector('.big-picture__img');
  const bigFoto = document.querySelector('.big-picture');
  bigPictureImg.querySelector('img').src = element.url;
  bigFoto.querySelector('.likes-count').textContent = element.likes;
  bigFoto.querySelector('.comments-count').innerHTML = element.comments.length;
  getSocialComment(element.comments);
  bigFoto.querySelector('.social__caption').textContent = element.description;
};

export {getBigPictures};

