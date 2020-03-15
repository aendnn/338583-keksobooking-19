'use strict';

(function () {
  var COORDINATES_START_INDEX = 0;
  var COORDINATES_PX_INDEX = -2;

  var mapPins = window.util.map.querySelector('.map__pins');
  var mapWidth = window.util.map.offsetWidth;
  var mapHeight = window.util.map.offsetHeight;
  var pinActive;

  var generateCard = function (element, area, render) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(render(element));

    area.appendChild(fragment);
  };

  // возвращает клонированные объекты
  var generatePins = function (array, area, render, quantity, maxAmount) {
    var takeNumber = quantity > maxAmount ? maxAmount : quantity;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(render(array[i]));
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

    generateCard(ad, window.util.map, window.card.render);
    window.card.hideBlocks(ad);
    window.card.close();
  };

  // активирует пин
  var activePin = function (evtTarget) {
    if (!pinActive) {
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

      if (target.classList.contains('js-pin')) {
        window.card.remove();
        activePin(target);
      }
    };

    var mapPinsKeyDownHandler = function (evt) {
      var target = evt.target;

      if (target.classList.contains('js-pin') && evt.key === window.util.enter) {
        window.card.remove();
        activePin(target);
      }
    };

    mapPins.addEventListener('click', mapPinsClickHandler);
    mapPins.addEventListener('keydown', mapPinsKeyDownHandler);
  };

  window.map = {
    pins: mapPins,
    width: mapWidth,
    height: mapHeight,
    activePin: pinActive,
    viewCard: viewCard,
    clear: clearItems,
    generate: generatePins,
    onInteracte: addInteracteWithPins
  };
})();
