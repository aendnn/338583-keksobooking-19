'use strict';

(function () {
  var mapPins = window.util.map.querySelector('.map__pins');

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
    if (items) {
      for (var i = 0; i < items.length; i++) {
        items[i].remove();
      }
    }
  };

  // просмотр карточки
  var viewCard = function (left, top) {
    var i;
    var ad;
    var card;

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

      var closeBtnClickHandler = function () {
        window.dialog.closeByBtn(card);
      };

      var closeBtnKeyDownHandler = function (evt) {
        window.dialog.closeByBtn(evt, card);
      };

      var documentKeyDownHandler = function (evt) {
        window.dialog.closeByEsc(evt, card);
      };


      var closeBtn = document.querySelector('.popup__close');
      closeBtn.addEventListener('click', closeBtnClickHandler);
      closeBtn.addEventListener('keydown', closeBtnKeyDownHandler);
      document.addEventListener('keydown', documentKeyDownHandler);
    }
  };

  // по клику на пин открывается соответствующая карточка
  var mapPinsClickHandler = function (evt) {
    var target = evt.target.parentElement;

    if (target.matches('.js-pin')) {
      var targetX = target.style.left.slice(0, -2);
      var targetY = target.style.top.slice(0, -2);

      window.map.viewCard(targetX, targetY);
    }
  };

  mapPins.addEventListener('click', mapPinsClickHandler);

  window.map = {
    pins: mapPins,
    viewCard: viewCard,
    clear: clearItems,
    generate: generateThings
  };
})();
