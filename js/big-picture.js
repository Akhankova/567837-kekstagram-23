const socialCommentCount = document.querySelector('.social__comment-count');
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
