'use strict';

(function () {
  var COORDINATES_START_INDEX = 0;
  var COORDINATES_PX_INDEX = -2;

  var mapPins = window.util.map.querySelector('.map__pins');
  var mapWidth = window.util.map.offsetWidth;
  var mapHeight = window.util.map.offsetHeight;

  // возвращает клонированные объекты
  var generateThings = function (array, area, render, quantity, maxAmount) {
    var takeNumber = quantity > maxAmount ? maxAmount : quantity;
    var fragment = document.createDocumentFragment();

    if (Array.isArray(array)) {
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(render(array[i]));
      }
    } else {
      fragment.appendChild(render(array));
    }

    area.appendChild(fragment);
  };

  // очищает элементы
  var clearItems = function (items) {
    items.forEach(function (item) {
      item.remove();
    });
  };

  // просмотр карточки
  var viewCard = function (left, top) {
    var i;
    var ad;

    var getCoordinates = function (element, index) {
      i = index;
      var coordinateX = window.data.ads[i].location.x.toString();
      var coordinateY = window.data.ads[i].location.y.toString();
      return left === coordinateX && top === coordinateY;
    };

    if (window.data.ads.some(getCoordinates)) {
      ad = window.data.ads[i];
    }

    generateThings(ad, window.util.map, window.card.render, window.data.adsCount);
    window.card.hideBlocks(ad);
    window.card.close();
  };

  // активирует пин
  var activePin = function (evtTarget) {
    if (!document.querySelector('.map__pin--active')) {
      evtTarget.classList.toggle('map__pin--active');

      var targetX = evtTarget.style.left.slice(COORDINATES_START_INDEX, COORDINATES_PX_INDEX);
      var targetY = evtTarget.style.top.slice(COORDINATES_START_INDEX, COORDINATES_PX_INDEX);

      viewCard(targetX, targetY);
    }
  };

  // клик по пину открывает карточку
  var addInteracteWithPins = function () {
    var mapPinsClickHandler = function (evt) {
      var target = evt.target.parentElement;

      window.card.remove();

      if (target.matches('.js-pin')) {
        activePin(target);
      }
    };

    var mapPinsKeyDownHandler = function (evt) {
      var target = evt.target;

      window.card.remove();

      if (target.matches('.js-pin') && evt.key === window.util.enter) {
        activePin(target);

        mapPins.removeEventListener('click', mapPinsClickHandler);
      }
    };

    mapPins.addEventListener('click', mapPinsClickHandler);
    mapPins.addEventListener('keydown', mapPinsKeyDownHandler);
  };

  window.map = {
    pins: mapPins,
    width: mapWidth,
    height: mapHeight,
    viewCard: viewCard,
    clear: clearItems,
    generate: generateThings,
    onInteracte: addInteracteWithPins
  };
})();
