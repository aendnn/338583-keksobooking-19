'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_KEYCODE = 0;

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');

  // создает DOM-элементы
  var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    return element;
  };

  window.util = {
    map: map,
    form: form,
    enter: ENTER_KEY,
    esc: ESC_KEY,
    leftMouseBtn: LEFT_MOUSE_KEYCODE,
    createTag: createElement
  };
})();
