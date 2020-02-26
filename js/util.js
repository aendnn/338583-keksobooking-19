'use strict';

(function () {
  var EXCLUDING_NUMBER = 1;

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_KEYCODE = 0;

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;

  var form = document.querySelector('.ad-form');

  window.util = {
    map: map,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    form: form,
    EXCLUDING_NUMBER: EXCLUDING_NUMBER,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    LEFT_MOUSE_KEYCODE: LEFT_MOUSE_KEYCODE,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    URL: URL
  };
})();
