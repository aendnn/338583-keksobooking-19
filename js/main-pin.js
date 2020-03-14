'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');

  var MainPin = {
    ELEMENT: pinMain,
    WIDTH: pinMain.offsetWidth,
    HEIGHT: pinMain.offsetHeight,
    PIN_X_MAX: window.util.mapWidth,
    PIN_Y_MIN: 130,
    PIN_Y_MAX: 630,
  };

  var left = pinMain.style.left.slice(0, -2);
  var top = pinMain.style.top.slice(0, -2);

  var addinteracteOnMainPin = function () {
    window.form.addAddress(true, left, top);

    if (!window.util.map.classList.contains('map--faded')) {
      pinMain.removeEventListener('keydown', pinMainKeyDownHandler);
      pinMain.removeEventListener('mousedown', pinMainMouseDownHandler);
    }
  };

  // по клику на enter активируется страница
  var pinMainKeyDownHandler = function (evt) {
    if (evt.key === window.util.enter) {
      window.page.active();
      addinteracteOnMainPin();
    }
  };

  // по клику на метку активируется страница
  var pinMainMouseDownHandler = function (evt) {
    if (evt.button === window.util.leftMouseBtn) {
      window.page.active();
      addinteracteOnMainPin();
    }
  };

  pinMain.addEventListener('keydown', pinMainKeyDownHandler);
  pinMain.addEventListener('mousedown', pinMainMouseDownHandler);

  window.mainPin = {
    item: MainPin.ELEMENT,
    width: MainPin.WIDTH,
    height: MainPin.HEIGHT,
    yMin: MainPin.PIN_Y_MIN,
    yMax: MainPin.PIN_Y_MAX,
    keyDown: pinMainKeyDownHandler,
    mouseDown: pinMainMouseDownHandler
  };
})();
