
//import { getRandomNumberIdComments } from "./util";

const socialCommentCount = document.querySelector('.social__comment-count');
//const commentsCount = document.querySelector('.comments-count');
const socialСomments = document.querySelector('.social__comments');
const socialСommentsLoader = document.querySelector('.comments-loader');
const getSocialComment = (elements) => {
  socialСommentsLoader.classList.remove('hidden');
  const similarListFragment = document.createDocumentFragment();
  const secondListFragment = document.createDocumentFragment();
  let commentsToShowCount = 0;
  let quantityComments = 0;
  const showComments = () => {
    socialСomments.innerHTML = ' ';
    commentsToShowCount += 5;
    quantityComments += 5;
    const commentsToShow = elements.slice(0, commentsToShowCount);
    commentsToShow.forEach((element) => {
      socialСomments.innerHTML = ' ';
      const socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');
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
      secondListFragment.appendChild(socialComment);
      if (element === elements[elements.length-1]) {
        socialСommentsLoader.classList.add('hidden');
        socialCommentCount.innerHTML = `${elements.length} из <span class='comments-count'>${elements.length}</span> комментариев`;
      } else {
        socialСommentsLoader.classList.remove('hidden');
        socialCommentCount.innerHTML = `${quantityComments} из <span class='comments-count'>${elements.length}</span> комментариев`;
      }
    });
    socialСomments.appendChild(secondListFragment);
  };
  showComments();
  socialСommentsLoader.addEventListener('click', showComments);

  socialСomments.appendChild(similarListFragment);


  socialСommentsLoader.classList.remove('hidden');
  for (let conter = 0; conter < step; conter++) {
    if (socialСomments.children.item(conter)) {
      socialСomments.children.item(conter).classList.add('visi');
      socialСomments.children.item(conter).classList.remove('hidden');
    }
  }
  const commentVisi = document.querySelectorAll('.visi');
  let next = commentVisi[commentVisi.length-1].nextElementSibling;
  let stepOfComment = 1;
  const getMoreComments = () => {
    while (stepOfComment <= step) {
      if (next && next !== socialСomments.children[socialСomments.children.length-1]) {
        next.classList.add('visi');
        next.classList.remove('hidden');
        next = next.nextElementSibling;
        stepOfComment ++;
      } else if (next === socialСomments.children[socialСomments.children.length-1]) {
        next.classList.add('visi');
        next.classList.remove('hidden');
        socialСommentsLoader.classList.add('hidden');
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
  document.querySelector('.comments-count').textContent = element.comments.length;
  getSocialComment(element.comments);
  bigFoto.querySelector('.social__caption').textContent = element.description;
};

export {getBigPictures};

