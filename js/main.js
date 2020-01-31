'use strict';

var TITLES = [
  'Частная студия в Соле',
  'Пещерный Дом в Ия',
  'Уютная квартира у Дворцовой Площади',
  'Уютная стильная мансарда',
  'Lazybear Студия Chocolate N1',
  'Двухуровневые Апартаменты в центре Санкт-Петербурга',
  'Уютная квартира в центре Санкт-Петербурга',
  'Cовременные апартаменты-студио с видом ID189'
];

var DESCRIPTIONS = [
  'Чистая и уютная квартира оформлена в современном стиле',
  'Великолепные апартаменты-студио с современным дизайнерским интерьером в стиле лофт',
  'Удобное месторасположение и уникальный дизайн апартаментов подарят Вам незабываемые ощущения',
  'Квартира укомплектована всем необходимым для комфортного отдыха', 'Чистая и уютная квартира оформлена в современном стиле',
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

var PIN = {
  width: 50,
  height: 40,
  xMax: 1200,
  yMin: 130,
  yMax: 630
};
var PIN_POINTER_CENTER = PIN.width / 2;

var TOTAL_ADS = 8;
var ads = [];

var EXCLUDING_NUMBER = 1;

var map = document.querySelector('.map');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

// возвращает случайное число
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

// возвращает случайный индекс элемента
var getValue = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// возвращает массив преимуществ произвольной длины
var getString = function (array) {
  var newArray = [];

  for (var i = 0; i <= getRandomNumber(1, array.length); i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

// возвращает массив с объявлениями
var getAds = function (array, quantity) {
  for (var i = 0; i < quantity; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      location: {
        x: getRandomNumber(0, (PIN.xMax - PIN.width) + EXCLUDING_NUMBER), // координата x от 0 до 1150(карта 1200px - маркер)
        y: getRandomNumber(PIN.yMin, PIN.yMax + EXCLUDING_NUMBER)
      },
      offer: {
        title: getValue(TITLES),
        address: // ad.location.x - PIN.width + ', ' + ad.location.y - PIN.height, выдает undefined
        getRandomNumber(0, (PIN.xMax - PIN.width) + EXCLUDING_NUMBER) + ', ' + getRandomNumber(PIN.yMin, PIN.yMax + EXCLUDING_NUMBER),
        price: getValue(PRICES),
        type: getValue(TYPE_OF_HOUSES),
        rooms: getValue(ROOMS),
        guests: getValue(GUESTS),
        checkin: getValue(CHECKIN_AND_CHECKOUT_HOURS),
        checkout: getValue(CHECKIN_AND_CHECKOUT_HOURS),
        features: getString(FEATURES_LIST),
        description: getValue(DESCRIPTIONS),
        photos: getString(PHOTOS_LIST)
      }
    };
    array.push(ad);
  }
  return array;
};

// возвращает отрисованную метку
var renderPin = function (pin) {
  var pinElement = template.cloneNode(true);

  pinElement.style.left = pin.location.x - PIN_POINTER_CENTER + 'px';
  pinElement.style.top = pin.location.y - PIN.height + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

// возвращает клонированные объекты
var generatePins = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }

  map.appendChild(fragment);
};

getAds(ads, TOTAL_ADS);
generatePins(ads, TOTAL_ADS);

map.classList.remove('map--faded');
