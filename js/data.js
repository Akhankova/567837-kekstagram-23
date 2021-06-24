import {getRandomValue, getRandomArrayElement, getRandomNumberIdComments, creatMessage, creatAvatar} from './util.js';

const MIN_NUMBER_LIKE = 15;
const MAX_NUMBER_LIKE = 200;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 1000;
const MAX_COMMENT = 6;
const MIN_COMMENT = 1;


const MAX_VALUE_AVATAR = 6;
const commentsMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const names = ['Маша', 'Катя', 'Иван Петрович', 'Олег', 'Дмитрий', 'Ирина', 'Слава', 'Виталий Игоревич', 'Андрей', 'Светлана', 'Яна', 'Макар', 'Даша'];

const descriptions = [
  'Живите во всех тех моментах, которые вы не можете выразить словами.',
  'Не ждите идеального момента.',
  'Берите каждый момент и делайте его идеальным.',
  'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.',
  'Я пыталась заниматься йогой, но в позе лотоса уснула.',
  'Никогда не позволяйте никому скучать.',
  'Все только начинает становиться действительно хорошим.',
  'Мечтайте. Поверьте, в это. Добейтесь этого.',
  'Утром, только одна хорошая мысль меняет смысл целого дня.',
  'Надейтесь на лучшее, но не ждите этого.',
];


const createFotoDescription = (index) => {
  const commentsArray = [];

  for (let counter = 1; counter <= getRandomValue(MIN_COMMENT, MAX_COMMENT); counter ++) {
    const commentElement = {
      id: getRandomNumberIdComments(MIN_COMMENT_ID, MAX_COMMENT_ID),
      avatar: `img/avatar-${creatAvatar(MAX_VALUE_AVATAR, counter)}.svg`,
      message: creatMessage(commentsMessages),
      name: getRandomArrayElement(names),
    };
    commentsArray.push(commentElement);
  }
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomValue(MIN_NUMBER_LIKE, MAX_NUMBER_LIKE),
    comments: commentsArray,
  };
};

const getArrayObject = (value) => {
  const similarFotos = [];
  for (let index = 1; index <= value; index ++) {
    const newRandomObject = createFotoDescription(index);
    similarFotos.push(newRandomObject);
  }
  return similarFotos;
};
export {getArrayObject, createFotoDescription};
