'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var cardTemplate = document.querySelector('#card').content;

  var HousesNames = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  // создает изображение
  var renderPhoto = function (photo) {
    var photoItem = window.util.createTag('img', 'popup__photo');
    photoItem.src = photo;
    photoItem.width = PHOTO_WIDTH;
    photoItem.height = PHOTO_HEIGHT;

    return photoItem;
  };

  // клонирует изображения
  var getPhotos = function (array) {
    var photosFragment = document.createDocumentFragment();

    array.forEach(function (photo) {
      photosFragment.appendChild(renderPhoto(photo));
    });

    return photosFragment;
  };

  // клонирует преимущества
  var generateFeatures = function (array) {
    var featuresFragment = document.createDocumentFragment();
    var featureSpecialClass = '';
    var featuresItem;

    array.forEach(function (feature) {
      featuresItem = window.util.createTag('li', 'popup__feature');
      featureSpecialClass = 'popup__feature--' + feature;
      featuresItem.classList.add(featureSpecialClass);
      featuresFragment.appendChild(featuresItem);
    });

    return featuresFragment;
  };

  // отрисовка карточки
  var renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);

    var typeOfHouse = ad.offer.type.toUpperCase();

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HousesNames[typeOfHouse];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(generateFeatures(ad.offer.features));
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(getPhotos(ad.offer.photos));
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return cardElement;
  };

  // удаляет пустые блоки
  var hideEmptyBlocks = function (item) {
    for (var key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        var value = item[key];

        if (value === 0 || value.length === 0 || value === '') {
          var className = '.popup__' + key;

          if (key === 'rooms' || key === 'guests') {
            className = '.popup__text--capacity';
          }

          if (document.querySelector(className)) {
            document.querySelector(className).remove();
          }
        }

        if (typeof value === 'object') {
          hideEmptyBlocks(value);
        }
      }
    }
  };

  // удаляет карточку
  var remove = function () {
    if (document.querySelector('.popup')) {
      var card = document.querySelector('.popup');
      var pinActive = document.querySelector('.map__pin--active');

      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }

      card.remove();
      document.removeEventListener('keydown', documentKeyDownHandler);
    }
  };

  var documentKeyDownHandler = function (e) {
    if (e.key === window.util.esc) {
      window.card.remove();
    }
  };


  // закрытие карточки
  var closeCard = function () {
    var closeBtn = document.querySelector('.popup__close');

    var closeBtnClickHandler = function () {
      remove();
      document.removeEventListener('keydown', documentKeyDownHandler);
    };

    var closeBtnKeyDownHandler = function (evt) {
      if (evt.key === window.util.enter) {
        remove();
        document.removeEventListener('keydown', documentKeyDownHandler);
      }
    };

    document.addEventListener('keydown', documentKeyDownHandler);
    closeBtn.addEventListener('click', closeBtnClickHandler);
    closeBtn.addEventListener('keydown', closeBtnKeyDownHandler);
  };

  window.card = {
    render: renderCard,
    hideBlocks: hideEmptyBlocks,
    close: closeCard,
    remove: remove
  };
})();
