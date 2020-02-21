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
      window.util.generate(ad, window.util.map, window.cards.render);
      card = document.querySelector('.popup');
      closePopup();
    }
  };

  window.cards = {
    create: createElement,
    renderPhoto: renderPhoto,
    getPhotos: getPhotos,
    generateFeatures: generateFeatures,
    render: renderCard,
    view: viewCard
  };
})();
