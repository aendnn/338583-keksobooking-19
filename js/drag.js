'use strict';

(function () {
  var PIN_Y_MIN = 130;
  var PIN_Y_MAX = 630;

  var drag = function () {
    window.mainPin.item.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var documentMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        window.mainPin.item.removeEventListener('mousedown', window.mainPin.mouseDown);
        window.mainPin.item.removeEventListener('keydown', window.mainPin.keyDown);

        var limits = {
          top: PIN_Y_MIN - window.mainPin.height,
          right: window.map.width - window.pin.getCenter(window.pin.width),
          bottom: PIN_Y_MAX - window.mainPin.height,
          left: -window.pin.getCenter(window.pin.width)
        };

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var getCoordinates = function (x, y) {
          if (y <= limits.bottom && y >= limits.top) {
            window.mainPin.item.style.top = (window.mainPin.item.offsetTop - shift.y) + 'px';
          }

          if (x <= limits.right && x >= limits.left) {
            window.mainPin.item.style.left = (window.mainPin.item.offsetLeft - shift.x) + 'px';
          }
        };

        var currentCoords = {
          x: window.mainPin.item.offsetLeft - shift.x,
          y: window.mainPin.item.offsetTop - shift.y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var addressCoords = {
          x: currentCoords.x + window.pin.getCenter(window.mainPin.item.width),
          y: currentCoords.y + window.mainPin.item.height
        };

        getCoordinates(currentCoords.x, currentCoords.y);
        window.form.addAddress(true, addressCoords.x, addressCoords.y);
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

  drag();
})();
