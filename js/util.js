const INVALID_VALUE_ERROR_TEXT = 'Максимальное значение не должно быть меньше или равно минимальному значению';
const NEGATIVE_VALUE_ERROR_TEXT = 'Диапазон может быть только положительный';
const MIN_QUANTITY_COMMENTS = 1;
const MAX_QUANTITY_COMMENTS = 2;

const getRandomValue = function (minValue, maxValue) {
  if (minValue >= maxValue) {
    return INVALID_VALUE_ERROR_TEXT;
  }
  if (minValue < 0 || maxValue < 0) {
    return NEGATIVE_VALUE_ERROR_TEXT;
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
const creatAvatar = (maxValueAvatar, index) => {
  if (index > maxValueAvatar && !(index % maxValueAvatar === 0)) {
    index = index % maxValueAvatar;
  } else if (index % maxValueAvatar === 0) {
    index = maxValueAvatar;
  }
  return index;
};

export {getRandomValue, getRandomArrayElement, getRandomNumberIdComments, creatMessage, creatAvatar};
