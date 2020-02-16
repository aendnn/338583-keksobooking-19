'use strict';

var TITLES = [
  'Частная студия в Соле',
  'Пещерный Дом в Ия',
  'Уютная квартира у Дворцовой Площади',
  'Уютная стильная мансарда',
  'Lazybear Студия Chocolate N1',
  'Двухуровневые Апартаменты в центре Санкт-Петербурга',
  'Уютная квартира в центре Санкт-Петербурга',
  'Cовременные апартаменты-студио'
];

var DESCRIPTIONS = [
  'Чистая и уютная квартира оформлена в современном стиле',
  'Великолепные апартаменты-студио с современным дизайнерским интерьером в стиле лофт',
  'Удобное месторасположение и уникальный дизайн апартаментов подарят Вам незабываемые ощущения',
  'Квартира укомплектована всем необходимым для комфортного отдыха',
  'Чистая и уютная квартира оформлена в современном стиле',
  'Современные апартаменты в центре Киева, оформленные в стиле лофт для удобного размещается 2 человек',
  'Дешевая, но все же уютная квартира в центре Киева',
  'Однокомнатная квартира, с высокими потолками'
];

var TYPE_OF_HOUSES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var HousesNames = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

var HousesPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALO: 0
};

var PRICES = [
  5000,
  10000,
  2300,
  1800,
  5380,
  1050,
  2300,
  4300
];

var ROOMS = [
  2,
  1,
  3,
  4,
  5
];

var GUESTS = [
  2,
  4,
  1,
  5,
  7,
  10
];

var CHECKIN_AND_CHECKOUT_HOURS = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var TOTAL_ADS = 8;
var EXCLUDING_NUMBER = 1;

var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;

var ENTER_KEY = 'Enter';
var LEFT_MOUSE_KEYCODE = 0;

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

var ads = [];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapWidth = map.offsetWidth;
var mapHeight = map.offsetHeight;

var pinSelector = map.querySelector('.map__pin');
var pinMainSelector = document.querySelector('.map__pin--main');
var pin = {
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
var cardTemplate = document.querySelector('#card').content;

var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

var submit = document.querySelector('.ad-form__submit');
var addressField = form.querySelector('#address');
var roomsCountField = form.querySelector('#room_number');
var guestsCountField = form.querySelector('#capacity');
var titleField = form.querySelector('#title');
var typeField = form.querySelector('#type');
var priceField = form.querySelector('#price');
var timeInField = form.querySelector('#timein');
var timeOutField = form.querySelector('#timeout');
var imagesField = form.querySelector('#images');
var avatarField = form.querySelector('#avatar');

// возвращает случайное число
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

// возвращает случайный элемент
var getRandomThing = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// возвращает массив произвольной длины
var getElements = function (array) {
  var condition = getRandomNumber(1, array.length + 1); // кол-во итераций от 1(чтобы не возвращался пустой массив) до длины массива + 1(сдвиг индекса чтобы получить последний элемент)
  var newArray = [];

  for (var i = 0; i < condition; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

// возвращает массив с объявлениями
var getAds = function (array, quantity) {
  for (var i = 0; i < quantity; i++) {
    var locationX = getRandomNumber(0, (pin.xMax - pin.width - pin.getPointer(pin.width) + EXCLUDING_NUMBER));
    var locationY = getRandomNumber(pin.yMin, pin.yMax + EXCLUDING_NUMBER - pin.height);

    var ad = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      location: {
        x: locationX,
        y: locationY
      },
      offer: {
        title: getRandomThing(TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomThing(PRICES),
        type: getRandomThing(TYPE_OF_HOUSES),
        rooms: getRandomThing(ROOMS),
        guests: getRandomThing(GUESTS),
        checkin: getRandomThing(CHECKIN_AND_CHECKOUT_HOURS),
        checkout: getRandomThing(CHECKIN_AND_CHECKOUT_HOURS),
        features: getElements(FEATURES_LIST),
        description: getRandomThing(DESCRIPTIONS),
        photos: getElements(PHOTOS_LIST)
      }
    };
    array.push(ad);
  }
  return array;
};

// возвращает отрисованную метку
var renderPin = function (pinItem) {
  var pinElement = template.cloneNode(true);

  pinElement.style.left = pinItem.location.x + 'px';
  pinElement.style.top = pinItem.location.y + 'px';
  pinElement.querySelector('img').src = pinItem.author.avatar;
  pinElement.querySelector('img').alt = pinItem.offer.title;

  return pinElement;
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

// возвращает клонированные объекты
var generateThings = function (array, area, render) {
  var fragment = document.createDocumentFragment();

  if (Array.isArray(array)) {
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(render(array[i]));
    }
  } else {
    fragment.appendChild(render(array));
  }

  area.appendChild(fragment);
};

// добавляет или удаляет атрибуты disabled, в зависимости от флага isActive
var changeFieldsetsState = function (array, isActive) {
  if (isActive) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled', 'disabled');
    }
  } else {
    for (var j = 0; j < array.length; j++) {
      array[j].setAttribute('disabled', 'disabled');
    }
  }
};

// заполняет поле с адресом
var addAddress = function (isActive) {
  if (isActive) {
    // координаты острого конца метки
    addressField.value = (Math.round(pinMainSelector.offsetLeft + pin.getPointer(pin.mainWidth))) +
      ', ' +
      (Math.round(pinMainSelector.offsetTop + pin.mainHeight));
  } else {
    // если страница не активна, координаты метки - центр карты
    addressField.value = (Math.round(mapWidth / 2)) + ', ' + (Math.round(mapHeight / 2));
  }
};

// валидация

// валидация полей гостей и комнат
var validateGuestsAndRooms = function () {
  roomsCountField.setCustomValidity('Введите корректное значение');
  guestsCountField.setCustomValidity('Слишком много гостей');

  if (roomsCountField.value === guestsCountField.value) {
    roomsCountField.setCustomValidity('');
    guestsCountField.setCustomValidity('');
  } else if ((roomsCountField.value !== '100') && (roomsCountField.value > guestsCountField.value) && (guestsCountField.value !== '100')) {
    roomsCountField.setCustomValidity('');
    guestsCountField.setCustomValidity('');
  }
};

// валидация файлов
var validateFiles = function (file) {
  file.setCustomValidity('Выберите изображение');

  if (file.files[0] && (file.files[0].type === 'image/jpeg' || file.files[0].type === 'image/png')) {
    file.setCustomValidity('');
  }
};

// валидация поля заголовка
var validateTitle = function () {
  titleField.setCustomValidity('Минимум 30 символов, максимум - 100, сейчас: ' + titleField.value.length);

  if ((titleField.value.length >= MIN_TITLE_LENGTH) && (titleField.value.length <= MAX_TITLE_LENGTH)) {
    titleField.setCustomValidity('');
  }
};

// валидация полей чекин/чекаут
var validateTime = function () {
  timeInField.setCustomValidity('Выберите корректное значение');
  timeOutField.setCustomValidity('Выберите корректное значение');

  if (timeInField.value === timeOutField.value) {
    timeInField.setCustomValidity('');
    timeOutField.setCustomValidity('');
  }
};

// изменяет значение плейсхолдера в зависимости от типа жилья
var changePlaceholder = function () {
  for (var i = 0; i < TYPE_OF_HOUSES.length; i++) {
    if (typeField.value === TYPE_OF_HOUSES[i]) {
      priceField.placeholder = HousesPrices[TYPE_OF_HOUSES[i].toUpperCase()];
    }
  }
};

// валидация полей стоимости и типа жилья
var validatePricesAndTypes = function () {
  priceField.setCustomValidity('Введите корректную стоимость');
  var numberPrice = parseInt(priceField.value, 10);

  changePlaceholder();

  if (priceField.type === 'number' && (numberPrice > 0 && numberPrice <= 1000000)) {
    typeField.setCustomValidity('');
  }

  if (typeField.value === 'bungalo' && numberPrice >= 0) {
    typeField.setCustomValidity('');
    priceField.setCustomValidity('');
  } else if (typeField.value === 'flat' && numberPrice >= 1000) {
    typeField.setCustomValidity('');
    priceField.setCustomValidity('');
  } else if (typeField.value === 'house' && numberPrice >= 5000) {
    typeField.setCustomValidity('');
    priceField.setCustomValidity('');
  } else if (typeField.value === 'palace' && numberPrice >= 10000) {
    typeField.setCustomValidity('');
    priceField.setCustomValidity('');
  }
};

var showFormErrors = function (evt) {
  for (var i = 0; i < form.elements.length; i++) {
    if (!form.elements[i].validity.valid) {
      evt.preventDefault();
      form.elements[i].style.borderColor = 'red';
      submit.setAttribute('disabled', 'disabled');

      if (form.elements[i].type === 'file') {
        document.querySelector('.ad-form__drop-zone').style.borderColor = 'red';
        document.querySelector('.ad-form-header__drop-zone').style.borderColor = 'red';
      }
    }
  }
};

var validateFields = function () {
  addressField.setAttribute('readonly', 'readonly');

  var onAvatarFieldChange = function () {
    validateFiles(avatarField);
  };

  var onImagesFieldChange = function () {
    validateFiles(imagesField);
  };

  var onGuestsCountFieldChange = function () {
    validateGuestsAndRooms();
  };

  var onRoomsCountFieldChange = function () {
    validateGuestsAndRooms();
  };

  var onTitleFieldChange = function () {
    validateTitle();
  };

  var onPriceFieldChange = function () {
    validatePricesAndTypes();
  };

  var onTypeFieldChange = function () {
    validatePricesAndTypes();
  };

  var onTimeInChange = function () {
    validateTime();
  };

  var onTimeOutChange = function () {
    validatePricesAndTypes();
  };

  var onSubmitForm = function () {
    showFormErrors();
  };

  guestsCountField.addEventListener('change', onGuestsCountFieldChange);
  roomsCountField.addEventListener('change', onRoomsCountFieldChange);
  titleField.addEventListener('change', onTitleFieldChange);
  typeField.addEventListener('change', onTypeFieldChange);
  priceField.addEventListener('change', onPriceFieldChange);
  timeInField.addEventListener('change', onTimeInChange);
  timeOutField.addEventListener('change', onTimeOutChange);
  imagesField.addEventListener('change', onImagesFieldChange);
  avatarField.addEventListener('change', onAvatarFieldChange);
  form.addEventListener('submit', onSubmitForm);
};

// переключает страницу в активное состояние
var activePage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  changeFieldsetsState(fieldsets, true);
  addAddress(true);
  validateFields();
  getAds(ads, TOTAL_ADS);
  generateThings(ads, mapPins, renderPin);
};

// по клику на метку активируется страница
var onPinMainSelectorMouseDown = function (evt) {
  if (map.classList.contains('map--faded')) {
    if (evt.button === LEFT_MOUSE_KEYCODE) {
      activePage();
    }
  }
};

// по клику на enter активируется страница
var onPinMainSelectorKeydown = function (evt) {
  if (map.classList.contains('map--faded')) {
    if (evt.key === ENTER_KEY) {
      activePage();
    }
  }
};


var getCard = function (left, top) {
  var closeBtn;

  for (var i = 0; i < ads.length; i++) {
    var coordinateX = ads[i].location.x.toString();
    var coordinateY = ads[i].location.y.toString();

    if (left === coordinateX && top === coordinateY) {
      if (!document.querySelector('.map__card')) {
        generateThings(ads[i], map, renderCard);
        closeBtn = document.querySelector('.popup__close');
        closeBtn.addEventListener('click', onCloseBtnClick);
        closeBtn.addEventListener('keydown', onCloseBtnKeydown);
      }
    }
  }
};

var onPinsClick = function (evt) {
  var target = evt.target;
  var targetX = target.style.left.slice(0, -2);
  var targetY = target.style.top.slice(0, -2);

  if (target.matches('.map__pin')) {
    getCard(targetX, targetY);
  }
};

var onCloseBtnClick = function () {
  var card = document.querySelector('.popup');

  if (card !== null) {
    card.remove();
  }
};

var onCloseBtnKeydown = function (evt) {
  var card = document.querySelector('.popup');

  if (card !== null && evt.key === ENTER_KEY) {
    card.remove();
  }
};

mapPins.addEventListener('click', onPinsClick);

pinMainSelector.addEventListener('mousedown', onPinMainSelectorMouseDown);
pinMainSelector.addEventListener('keydown', onPinMainSelectorKeydown);

changeFieldsetsState(fieldsets, false);
addAddress(false);
