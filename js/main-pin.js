'use strict';

(function () {
  var left = window.pin.main.style.left.slice(0, -2);
  var top = window.pin.main.style.top.slice(0, -2);

  // по клику на метку активируется страница
  var pinMainSelectorMouseDownHandler = function (evt) {
    window.form.addAddress(true, left, top);

    if (window.util.map.classList.contains('map--faded')) {
      if (evt.button === window.util.LEFT_MOUSE_KEYCODE) {
        window.activation.active();
      }
    }
  };

  // по клику на enter активируется страница
  var pinMainSelectorKeyDownHandler = function (evt) {
    window.form.addAddress(true, left, top);

    if (window.util.map.classList.contains('map--faded')) {
      if (evt.key === window.util.ENTER_KEY) {
        window.activation.active();
      }
    }
  };

  var drag = function () {
    window.pin.main.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var documentMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        window.pin.main.removeEventListener('mousedown', pinMainSelectorMouseDownHandler);

        var limits = {
          top: window.pin.item.yMin,
          right: window.util.mapWidth - window.pin.item.getPointer(window.pin.item.width),
          bottom: window.pin.item.yMax,
          left: 0
        };

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var currentCoords = {
          x: window.pin.main.offsetLeft - shift.x,
          y: window.pin.main.offsetTop - shift.y
        };

        var getCoordinates = function (x, y) {
          if (y <= limits.bottom && y >= limits.top) {
            window.pin.main.style.top = (window.pin.main.offsetTop - shift.y) + 'px';
          }

          if (x <= limits.right && x >= limits.left) {
            window.pin.main.style.left = (window.pin.main.offsetLeft - shift.x) + 'px';
          }
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        getCoordinates(currentCoords.x, currentCoords.y);
        window.form.addAddress(true, currentCoords.x, currentCoords.y);
      };

      var documentMouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', documentMouseMoveHandler);
        document.removeEventListener('mouseup', documentMouseUpHandler);
      };

      document.addEventListener('mousemove', documentMouseMoveHandler);
      document.addEventListener('mouseup', documentMouseUpHandler);
    });
  };

  window.pin.main.addEventListener('keydown', pinMainSelectorKeyDownHandler);
  window.pin.main.addEventListener('mousedown', pinMainSelectorMouseDownHandler);

  drag();
})();
