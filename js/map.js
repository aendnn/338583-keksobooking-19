'use strict';

(function () {
  var mapPins = window.util.map.querySelector('.map__pins');

  // возвращает клонированные объекты
  var generateThings = function (array, area, render, quantity) {
    var fragment = document.createDocumentFragment();

    if (Array.isArray(array)) {
      for (var i = 0; i < quantity; i++) {
        fragment.appendChild(render(array[i]));
      }
    } else {
      fragment.appendChild(render(array));
    }

    area.appendChild(fragment);
  };

  // просмотр карточки
  var viewCard = function (left, top) {
    var card;
    var closeBtn;
    var i;
    var ad;

    var onCloseBtnClick = function () {
      if (card !== null) {
        card.remove();
      }
    };

    var onCloseBtnKeydown = function (evt) {
      if (card !== null && evt.key === window.util.ENTER_KEY) {
        card.remove();
      }
    };

    var closePopup = function () {
      closeBtn = document.querySelector('.popup__close');
      closeBtn.addEventListener('click', onCloseBtnClick);
      closeBtn.addEventListener('keydown', onCloseBtnKeydown);
    };

    var getCoordinates = function (element, index) {
      i = index;
      var coordinateX = window.data.ads[i].location.x.toString();
      var coordinateY = window.data.ads[i].location.y.toString();
      return left === coordinateX && top === coordinateY;
    };

    if (window.data.ads.some(getCoordinates)) {
      ad = window.data.ads[i];
    }

    if (!document.querySelector('.map__card')) {
      window.map.generate(ad, window.util.map, window.card.render, window.data.adsCount);
      card = document.querySelector('.popup');

      if (ad.offer.features.length === 0) {
        card.querySelector('.popup__features').style.display = 'none';
      }

      closePopup();
    }
  };

  // по клику на пин открывается соответствующая карточка
  var onMapPinsClick = function (evt) {
    var target = evt.target.parentElement;

    if (target.matches('.js-pin')) {
      var targetX = target.style.left.slice(0, -2);
      var targetY = target.style.top.slice(0, -2);

      window.map.viewCard(targetX, targetY);
    }
  };

  mapPins.addEventListener('click', onMapPinsClick);

  window.map = {
    mapPins: mapPins,
    viewCard: viewCard,
    generate: generateThings
  };
})();
