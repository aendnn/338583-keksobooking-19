'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');

  var width = pinMain.offsetWidth;
  var height = pinMain.offsetHeight;

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

  var reset = function () {
    pinMain.style.top = '375px';
    pinMain.style.left = '570px';
    pinMain.addEventListener('mousedown', window.mainPin.mouseDown);
    pinMain.addEventListener('keydown', window.mainPin.keyDown);
  };

  pinMain.addEventListener('keydown', pinMainKeyDownHandler);
  pinMain.addEventListener('mousedown', pinMainMouseDownHandler);

  window.mainPin = {
    item: pinMain,
    width: width,
    height: height,
    reset: reset,
    keyDown: pinMainKeyDownHandler,
    mouseDown: pinMainMouseDownHandler
  };
})();
