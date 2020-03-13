'use strict';

(function () {
  var EXCLUDING_NUMBER = 1;

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_KEYCODE = 0;

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');

  window.util = {
    map: map,
    form: form,
    EXCLUDING_NUMBER: EXCLUDING_NUMBER,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    LEFT_MOUSE_KEYCODE: LEFT_MOUSE_KEYCODE
  };
})();
