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

  // возвращает отрисованную метку
  var renderPin = function (pinItem) {
    var pinElement = template.cloneNode(true);

    pinElement.style.left = pinItem.location.x + 'px';
    pinElement.style.top = pinItem.location.y + 'px';
    pinElement.querySelector('img').src = pinItem.author.avatar;
    pinElement.querySelector('img').alt = pinItem.offer.title;

    return pinElement;
  };

  window.pin = {
    item: PinCharacteristic,
    width: PinCharacteristic.WIDTH,
    height: PinCharacteristic.HEIGHT,
    getCenter: PinCharacteristic.getPointer,
    render: renderPin
  };

})();

