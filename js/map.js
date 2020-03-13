'use strict';

(function () {
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

    window.map.generate(ad, window.util.map, window.card.render, window.data.adsCount);

    var card = document.querySelector('.popup');
    var pinActive = document.querySelector('.map__pin--active');
    var closeBtn = document.querySelector('.popup__close');

    card.classList.toggle('popup--active');
    window.card.hide(ad);

    var closeBtnClickHandler = function () {
      window.dialog.closeByBtn(card);
      pinActive.classList.remove('map__pin--active');
    };

    var closeBtnKeyDownHandler = function (evt) {
      window.dialog.closeByBtn(evt, card);
      pinActive.classList.remove('map__pin--active');
    };

    var documentKeyDownHandler = function (evt) {
      window.dialog.closeByEsc(evt, card);
      pinActive.classList.remove('map__pin--active');
    };

    closeBtn.addEventListener('click', closeBtnClickHandler);
    closeBtn.addEventListener('keydown', closeBtnKeyDownHandler);
    document.addEventListener('keydown', documentKeyDownHandler);
  };

  // по клику на пин открывается соответствующая карточка
  var mapPinsClickHandler = function (evt) {
    var target = evt.target.parentElement;

    if (document.querySelector('.popup--active')) {
      var activePin = document.querySelector('.map__pin--active');
      var activeCard = document.querySelector('.popup--active');

      activePin.classList.remove('map__pin--active');
      activeCard.remove();
    }

    if (target.matches('.js-pin')) {
      if (!document.querySelector('.map__pin--active')) {
        target.classList.toggle('map__pin--active');

        var targetX = target.style.left.slice(0, -2);
        var targetY = target.style.top.slice(0, -2);

        window.map.viewCard(targetX, targetY);
      }
    }
  };

  mapPins.addEventListener('click', mapPinsClickHandler);

  window.map = {
    pins: mapPins,
    width: mapWidth,
    height: mapHeight,
    viewCard: viewCard,
    clear: clearItems,
    generate: generateThings
  };
})();
