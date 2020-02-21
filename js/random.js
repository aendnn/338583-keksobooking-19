'use strict';

(function () {
  // возвращает случайное число
  var getNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // возвращает случайный элемент
  var getElement = function (array) {
    return array[getNumber(0, array.length - 1)];
  };

  // возвращает массив произвольной длины
  var getElements = function (array) {
    var condition = getNumber(1, array.length + 1); // кол-во итераций от 1(чтобы не возвращался пустой массив) до длины массива + 1(сдвиг индекса чтобы получить последний элемент)
    var newArray = [];

    for (var i = 0; i < condition; i++) {
      newArray.push(array[i]);
    }
    return newArray;
  };

  window.random = {
    getNumber: getNumber,
    getElement: getElement,
    getElements: getElements
  };
})();
