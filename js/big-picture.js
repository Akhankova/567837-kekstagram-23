//import { getRandomNumberIdComments } from "./util";

const step = 5;
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const socialСomments = document.querySelector('.social__comments');
const socialСommentsLoader = document.querySelector('.comments-loader');
const getSocialComment = (elements) => {
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
      socialСomments.children.item(conter).classList.add('visi');
      socialСomments.children.item(conter).classList.remove('hidden');
    }
  }
  const span = ' ';
  const text = 'комментариев';
  const isi = 'из';
  socialCommentCount.innerHTML = socialСomments.children.length + span + isi + span + commentsCount.textContent + span + text;

  const commentVisi = document.querySelectorAll('.visi');
  let next = commentVisi[commentVisi.length-1].nextElementSibling;
  let stepOfComment = 1;
  let conter = 1;
  const getMoreComments = () => {
    while (stepOfComment <= step) {
      if (next && next !== socialСomments.children[socialСomments.children.length-1]) {
        next.classList.add('visi');
        next.classList.remove('hidden');
        next = next.nextElementSibling;
        stepOfComment ++;
        socialCommentCount.innerHTML = conter + span + isi + span + commentsCount.textContent + span + text;
        conter++;
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
  bigFoto.querySelector('.comments-count').innerHTML = element.comments.length;
  getSocialComment(element.comments);
  bigFoto.querySelector('.social__caption').textContent = element.description;
};

/*const getMore = () => {
  socialСommentsLoader.classList.add('hidden');
};
socialСommentsLoader.addEventListener('click', getMore);
socialСommentsLoader.classList.remove('hidden');

else if (next === socialСomments.children[socialСomments.children.length-1]) {
        next.classList.add('visi');
        next.classList.remove('hidden');
        socialCommentCount.textContent = commentsCount.textContent + span + isi + span + commentsCount.textContent + span + text;
        socialСommentsLoader.classList.add('hidden');
        break;
      }

          const span = ' ';
    const text = 'комментариев';
    const isi = 'из';
*/

export {getBigPictures};
