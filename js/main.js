const ourString = 'проверка работы функции';
const stringLength = 140;

const getLengthRow = function (row, maxLength) {

  if (row.length<=maxLength) {
    return true;
  }
  return false;
};
getLengthRow(ourString, stringLength);

const getRandomValue = function (minValue, maxValue) {
  const invalidValue = 'Максимальное значение не должно быть меньше или равно минимальному значению';
  const negativeValue = 'Диапазон может быть только положительный';
  if (minValue>=maxValue) {
    return invalidValue;
  }
  if (minValue<0 || maxValue<0) {
    return negativeValue;
  }
  return Math.floor(Math.random()*(maxValue-minValue+1)+minValue);
};
getRandomValue();
