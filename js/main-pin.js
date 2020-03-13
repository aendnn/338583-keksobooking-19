'use strict';

(function () {
  var pinMainSelector = document.querySelector('.map__pin--main');

  var MainPin = {
    ELEMENT: pinMainSelector,
    WIDTH: pinMainSelector.offsetWidth,
    HEIGHT: pinMainSelector.offsetHeight,
    PIN_X_MAX: window.util.mapWidth,
    PIN_Y_MIN: 130,
    PIN_Y_MAX: 630,
  };

  var left = pinMainSelector.style.left.slice(0, -2);
  var top = pinMainSelector.style.top.slice(0, -2);

  var interacteOnMainPin = function (evt) {
    window.form.addAddress(true, left, top);

    if (window.util.map.classList.contains('map--faded')) {
      if (evt.button === window.util.LEFT_MOUSE_KEYCODE || evt.key === window.util.ENTER_KEY) {
        window.page.active();
      }
    }
  };

  // по клику на enter активируется страница
  var pinMainSelectorKeyDownHandler = function (evt) {
    interacteOnMainPin(evt);
  };

  // по клику на метку активируется страница
  var pinMainSelectorMouseDownHandler = function (evt) {
    interacteOnMainPin(evt);
  };

  pinMainSelector.addEventListener('keydown', pinMainSelectorKeyDownHandler);
  pinMainSelector.addEventListener('mousedown', pinMainSelectorMouseDownHandler);

  window.mainPin = {
    item: MainPin.ELEMENT,
    width: MainPin.WIDTH,
    height: MainPin.HEIGHT,
    yMin: MainPin.PIN_Y_MIN,
    yMax: MainPin.PIN_Y_MAX,
    keyDown: pinMainSelectorKeyDownHandler,
    mouseDown: pinMainSelectorMouseDownHandler
  };
})();
