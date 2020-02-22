'use strict';

(function () {
  var PIN_Y_MIN = 130;
  var PIN_Y_MAX = 630;

  var pinSelector = window.util.map.querySelector('.map__pin');
  var pinMainSelector = document.querySelector('.map__pin--main');
  var pinCharacteristics = {
    width: pinSelector.offsetWidth,
    height: pinSelector.offsetHeight,
    xMax: window.util.mapWidth,
    yMin: PIN_Y_MIN,
    yMax: PIN_Y_MAX,
    mainHeight: pinMainSelector.offsetHeight,
    mainWidth: pinMainSelector.offsetWidth,
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
    item: pinCharacteristics,
    main: pinMainSelector,
    render: renderPin
  };

})();

