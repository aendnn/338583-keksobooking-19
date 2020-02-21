'use strict';

(function () {
  var TOTAL_ADS = 8;

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

  var ads = [];

  // возвращает массив с объявлениями
  var getAds = function (array, quantity) {
    for (var i = 0; i < quantity; i++) {
      var locationX = window.random.getNumber(0, (window.pins.item.xMax - window.pins.item.width - window.pins.item.getPointer(window.pins.item.width) + window.util.EXCLUDING_NUMBER));
      var locationY = window.random.getNumber(window.pins.item.yMin, window.pins.item.yMax + window.util.EXCLUDING_NUMBER - window.pins.item.height);

      var ad = {
        author: {
          avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
        },
        location: {
          x: locationX,
          y: locationY
        },
        offer: {
          title: window.random.getElement(TITLES),
          address: locationX + ', ' + locationY,
          price: window.random.getElement(PRICES),
          type: window.random.getElement(TYPE_OF_HOUSES),
          rooms: window.random.getElement(ROOMS),
          guests: window.random.getElement(GUESTS),
          checkin: window.random.getElement(CHECKIN_AND_CHECKOUT_HOURS),
          checkout: window.random.getElement(CHECKIN_AND_CHECKOUT_HOURS),
          features: window.random.getElements(FEATURES_LIST),
          description: window.random.getElement(DESCRIPTIONS),
          photos: window.random.getElements(PHOTOS_LIST)
        }
      };
      array.push(ad);
    }
    return array;
  };

  window.data = {
    adsCount: TOTAL_ADS,
    getAds: getAds,
    ads: ads,
    TYPE_OF_HOUSES: TYPE_OF_HOUSES
  };
})();
