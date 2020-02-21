'use strict';

(function () {
  var EXCLUDING_NUMBER = 1;

  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_KEYCODE = 0;

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');

  // возвращает клонированные объекты
  var generateThings = function (array, area, render) {
    var fragment = document.createDocumentFragment();

    if (Array.isArray(array)) {
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(render(array[i]));
      }
    } else {
      fragment.appendChild(render(array));
    }

    area.appendChild(fragment);
  };

  window.util = {
    map: map,
    form: form,
    EXCLUDING_NUMBER: EXCLUDING_NUMBER,
    ENTER_KEY: ENTER_KEY,
    LEFT_MOUSE_KEYCODE: LEFT_MOUSE_KEYCODE,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    generate: generateThings
  };

})();
