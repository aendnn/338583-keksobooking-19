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
  xMax: 980,
  yMin: 130,
  yMax: 630
};

var pinPointer = PIN.width / 2;

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
    var locationX = getRandomNumber(0, (PIN.xMax - PIN.width - pinPointer + EXCLUDING_NUMBER));
    var locationY = getRandomNumber(PIN.yMin, PIN.yMax + EXCLUDING_NUMBER - PIN.height);

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
var renderPin = function (pin) {
  var pinElement = template.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
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

  map.querySelector('.map__pins').appendChild(fragment);
};

getAds(ads, TOTAL_ADS);
generatePins(ads);

map.classList.remove('map--faded');
