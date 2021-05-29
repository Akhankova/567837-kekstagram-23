let string = 'проверка работы функции';
let stringLength = 140;

let getLengthRow = function (row, maxLength) {

  if (row.length<=maxLength) {
    return true
  }
  return false
}
getLengthRow(string, mstringLength);

let getRandomValue = function (minValue, maxValue) {
  let invalidValue = "Максимальное значение не должно быть меньше или равно минимальному значению";
  let negativeValue = "Диапазон может быть только положительный";
  if (minValue>=maxValue) {
    return invalidValue
  }
  if (minValue<0 || maxValue<0) {
    return negativeValue
  }
  return Math.floor(Math.random()*(max-min+1)+min);
}
getRandomValue();
