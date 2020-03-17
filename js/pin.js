'use strict';

(function () {
  var pin = window.util.map.querySelector('.map__pin');
  var PinCharacteristic = {
    WIDTH: pin.offsetWidth,
    HEIGHT: pin.offsetHeight,
    getPointer: function (width) {
      var center = width / 2;
      return center;
    }
  };

  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var getX = function (adElement, pinElement) {
    var x = parseInt((adElement.location.x - pinElement), 10);
    return x;
  };

  var getY = function (adElement, pinElement) {
    var y = parseInt((adElement.location.y - pinElement), 10);
    return y;
  };

  // возвращает отрисованную метку
  var renderPin = function (pinItem) {
    var pinElement = template.cloneNode(true);

    pinElement.style.left = getX(pinItem, PinCharacteristic.getPointer(PinCharacteristic.WIDTH)) + 'px';
    pinElement.style.top = getY(pinItem, PinCharacteristic.HEIGHT) + 'px';
    pinElement.querySelector('img').src = pinItem.author.avatar;
    pinElement.querySelector('img').alt = pinItem.offer.title;

    return pinElement;
  };


  window.pin = {
    item: PinCharacteristic,
    width: PinCharacteristic.WIDTH,
    height: PinCharacteristic.HEIGHT,
    getCenter: PinCharacteristic.getPointer,
    x: getX,
    y: getY,
    render: renderPin
  };

})();

