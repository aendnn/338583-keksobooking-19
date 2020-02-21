'use strict';

(function () {
  var PIN_Y_MIN = 130;
  var PIN_Y_MAX = 630;

  var mapWidth = window.util.map.offsetWidth;
  var mapHeight = window.util.map.offsetHeight;
  var mapPins = window.util.map.querySelector('.map__pins');

  var pinSelector = window.util.map.querySelector('.map__pin');
  var pinMainSelector = document.querySelector('.map__pin--main');
  var pinСharacteristics = {
    width: pinSelector.offsetWidth,
    height: pinSelector.offsetHeight,
    xMax: mapWidth,
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

  // по клику на пин открывается соответствующая карточка
  var onMapPinsClick = function (evt) {
    var target = evt.target.parentElement;

    if (target.matches('.js-pin')) {
      var targetX = target.style.left.slice(0, -2);
      var targetY = target.style.top.slice(0, -2);

      window.cards.view(targetX, targetY);
    }
  };

  mapPins.addEventListener('click', onMapPinsClick);

  window.pins = {
    item: pinСharacteristics,
    main: pinMainSelector,
    render: renderPin,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    mapPins: mapPins
  };

})();

