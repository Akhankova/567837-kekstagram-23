const QUANTITY_GENERATED_OBJECTS = 25;
const MIN_NUMBER_LIKE = 15;
const MAX_NUMBER_LIKE = 200;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 1000;
const MIN_QUANTITY_COMMENTS = 1;
const MAX_QUANTITY_COMMENTS = 2;
const STRING_LENGTH = 140;
const OUR_STRING = 'проверка работы функции';
const INVALID_VALUE = 'Максимальное значение не должно быть меньше или равно минимальному значению';
const NEGATIVE_VALUE = 'Диапазон может быть только положительный';

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
let urlAvatar = 0;

const getLengthRow = function (row, maxLength) {

  if (row.length <= maxLength) {
    return true;
  }
  return false;
};
getLengthRow(OUR_STRING, STRING_LENGTH);

const getRandomValue = function (minValue, maxValue) {
  if (minValue >= maxValue) {
    return INVALID_VALUE;
  }
  if (minValue < 0 || maxValue < 0) {
    return NEGATIVE_VALUE;
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

const getRandomArrayElement = (elements) => elements[getRandomValue(0, elements.length - 1)];

const commentIdNumbers = [];
const getRandomNumberIdComments = (min, max) => {
  const number = getRandomValue(min, max);
  if (commentIdNumbers.includes(number)) {
    return getRandomNumberIdComments(min, max);
  } else {
    commentIdNumbers.push(number);
    return number;
  }
};
const creatMessage = (elements) => {
  const numberOfMessage = getRandomValue(MIN_QUANTITY_COMMENTS, MAX_QUANTITY_COMMENTS);
  let messageText = getRandomArrayElement(elements);
  if (numberOfMessage === 2) {
    messageText += getRandomArrayElement(elements);
  }
  return messageText;
};

const createFotoDescription = (index) => ({
  id: index,
  url: 'photos/index.jpg',
  description: getRandomArrayElement(descriptions),
  likes: getRandomValue(MIN_NUMBER_LIKE, MAX_NUMBER_LIKE),
  comments: [
    {
      id: getRandomNumberIdComments(MIN_COMMENT_ID, MAX_COMMENT_ID),
      avatar: 'img/avatar-urlAvatar.svg',
      message: creatMessage(commentsMessages),
      name: getRandomArrayElement(names),
    },
  ],
});

const similarFotos = [];

for (let index=1; index<=QUANTITY_GENERATED_OBJECTS; index++) {
  urlAvatar++;
  if(urlAvatar%7 === 0) {
    urlAvatar = 1;
  }
  const newRandomObjekt = createFotoDescription(index);
  similarFotos.push(newRandomObjekt);
}
