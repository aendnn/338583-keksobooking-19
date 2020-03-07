'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeField = filterForm.querySelector('#housing-type');
  var priceField = filterForm.querySelector('#housing-price');
  var roomsField = filterForm.querySelector('#housing-rooms');

  var TYPE_OF_HOUSES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var PRICES = [
    'low',
    'middle',
    'high'
  ];

  var ROOMS = [
    '1',
    '2',
    '3'
  ];

  var adsByHouseType = [];
  var adsByPrice = [];
  var adsByRooms = [];
  var filteredAds = [];
  var pins;

  var checkTypes = function () {
    switch (typeField.value) {
      case TYPE_OF_HOUSES[0]:
        return typeField.value;

      case TYPE_OF_HOUSES[1]:
        return typeField.value;

      case TYPE_OF_HOUSES[2]:
        return typeField.value;

      case TYPE_OF_HOUSES[3]:
        return typeField.value;

      default:
        return typeField.value;
    }
  };

  var filterByType = function () {
    adsByHouseType = window.data.ads.filter(function (it) {
      switch (typeField.value) {
        case TYPE_OF_HOUSES[0]:
          return it.offer.type === TYPE_OF_HOUSES[0];

        case TYPE_OF_HOUSES[1]:
          return it.offer.type === TYPE_OF_HOUSES[1];

        case TYPE_OF_HOUSES[2]:
          return it.offer.type === TYPE_OF_HOUSES[2];

        case TYPE_OF_HOUSES[3]:
          return it.offer.type === TYPE_OF_HOUSES[3];

        default:
          return it.offer.type;
      }
    });

    pins = document.querySelectorAll('.js-pin');
    window.map.clear(pins);

    window.map.generate(adsByHouseType, window.map.pins, window.pin.render, adsByHouseType.length, window.data.TOTAL_ADS);
  };


  var filterAllFields = function () {
    var typeFieldChangeHandler = function () {
      filterByType();
    };

    typeField.addEventListener('change', typeFieldChangeHandler);

    var priceFieldChangeHandler = function () {
      filterByPrice();
    };

    priceField.addEventListener('change', priceFieldChangeHandler);

    var roomsFieldChangeHandler = function () {
      filterByRooms();
    };

    roomsField.addEventListener('change', roomsFieldChangeHandler);
  };

  var filterByPrice = function () {
    adsByPrice = window.data.ads.filter(function (it) {
      switch (priceField.value) {
        case PRICES[0]:
          return it.offer.price < 10000;

        case PRICES[1]:
          return it.offer.price > 10000 && it.offer.price < 50000;

        case PRICES[2]:
          return it.offer.price > 50000;

        default:
          return it.offer.price;
      }
    });

    pins = document.querySelectorAll('.js-pin');

    window.map.clear(pins);
    window.map.generate(adsByPrice, window.map.pins, window.pin.render, adsByPrice.length, window.data.TOTAL_ADS);

    filteredAds = adsByPrice;
  };

  var filterByRooms = function () {
    adsByRooms = window.data.ads.filter(function (it) {
      switch (roomsField.value) {
        case ROOMS[0]:
          return it.offer.rooms == ROOMS[0];

        case ROOMS[1]:
          return it.offer.rooms == ROOMS[1];

        case ROOMS[2]:
          return it.offer.rooms == ROOMS[2];

        default:
          return it.offer.rooms;
      }
    });

    pins = document.querySelectorAll('.js-pin');
    console.log(typeof roomsField.value, typeof ROOMS[0]);

    window.map.clear(pins);
    window.map.generate(adsByRooms, window.map.pins, window.pin.render, adsByRooms.length, window.data.TOTAL_ADS);

    filteredAds = filteredAds.concat(adsByRooms);


  };

  window.filter = {
    form: filterForm,
    typeField: typeField,
    byType: filterByType,
    allFields: filterAllFields
  };
})();
