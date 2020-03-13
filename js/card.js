'use strict';


(function () {
  var cardTemplate = document.querySelector('#card').content;

  var HousesNames = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  // создает DOM-элементы
  var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    return element;
  };

  // создает изображение
  var renderPhoto = function (photo) {
    var photoItem = createElement('img', 'popup__photo');
    photoItem.src = photo;
    photoItem.width = 45;
    photoItem.height = 40;

    return photoItem;
  };

  // клонирует изображения
  var getPhotos = function (array) {
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      photosFragment.appendChild(renderPhoto(array[i]));
    }

    return photosFragment;
  };

  // клонирует преимущества
  var generateFeatures = function (array) {
    var featuresFragment = document.createDocumentFragment();
    var featureSpecialClass = '';
    var featuresItem;

    for (var i = 0; i < array.length; i++) {
      featuresItem = createElement('li', 'popup__feature');
      featureSpecialClass = 'popup__feature--' + array[i];
      featuresItem.classList.add(featureSpecialClass);
      featuresFragment.appendChild(featuresItem);
    }
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


  window.card = {
    render: renderCard,
    hide: hideEmptyBlocks,
    createElement: createElement
  };
})();
