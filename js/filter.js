'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeField = filterForm.querySelector('#housing-type');
  var priceField = filterForm.querySelector('#housing-price');
  var roomsField = filterForm.querySelector('#housing-rooms');
  var guestsField = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');

  var PRICES = [
    'low',
    'middle',
    'high'
  ];

  var adsByHouseType = [];
  var adsByPrice = [];
  var adsByRooms = [];
  var adsByGuests = [];
  var pins;

  var checkPrices = function (value, data) {
    switch (value) {
      case PRICES[0]:
        return data.offer.price < 10000;

      case PRICES[1]:
        return data.offer.price > 10000 && data.offer.price < 50000;

      case PRICES[2]:
        return data.offer.price > 50000;

      default:
        return data.offer.price;
    }
  };

  var filterByType = function () {
    adsByHouseType = window.data.ads.filter(function (it) {
      return it.offer.type === typeField.value;
    });

    pins = document.querySelectorAll('.js-pin');
    window.map.clear(pins);

    window.map.generate(adsByHouseType, window.map.pins, window.pin.render, adsByHouseType.length, window.data.TOTAL_ADS);
  };

  var filterByPrice = function () {
    adsByPrice = window.data.ads.filter(function (it) {
      return checkPrices(priceField.value, it);
    });

    pins = document.querySelectorAll('.js-pin');

    window.map.clear(pins);
    window.map.generate(adsByPrice, window.map.pins, window.pin.render, adsByPrice.length, window.data.TOTAL_ADS);
  };

  var filterByRooms = function () {
    adsByRooms = window.data.ads.filter(function (it) {
      return it.offer.rooms.toString() === roomsField.value;
    });

    pins = document.querySelectorAll('.js-pin');

    window.map.clear(pins);
    window.map.generate(adsByRooms, window.map.pins, window.pin.render, adsByRooms.length, window.data.TOTAL_ADS);
  };

  var filterByGuests = function () {
    adsByGuests = window.data.ads.filter(function (it) {
      return it.offer.guests.toString() === guestsField.value;
    });
    pins = document.querySelectorAll('.js-pin');

    window.map.clear(pins);
    window.map.generate(adsByGuests, window.map.pins, window.pin.render, adsByGuests.length, window.data.TOTAL_ADS);

  };

  var filterByFeatures = function () {
    var checkedFeaturesBtns = featuresFieldset.querySelectorAll('input[type=checkbox]:checked');
    var checkedFeaturesArray = Array.from(checkedFeaturesBtns);
    var checkedFeaturesValues = checkedFeaturesArray.map(function (it) {
      return it.value;
    });

    var featuresAds = checkedFeaturesValues.forEach(function (feature) {
      return window.data.offer.features.includes(feature);
    });

    pins = document.querySelectorAll('.js-pin');

    window.map.clear(pins);
    window.map.generate(featuresAds, window.map.pins, window.pin.render, featuresAds.length, window.data.TOTAL_ADS);
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

    var guestsFieldChangeHandler = function () {
      filterByGuests();
    };

    guestsField.addEventListener('change', guestsFieldChangeHandler);

    var featuresFieldChangeHandler = function (evt) {
      filterByFeatures();
    };

    featuresFieldset.addEventListener('click', featuresFieldChangeHandler);
  };


  window.filter = {
    form: filterForm,
    typeField: typeField,
    byType: filterByType,
    allFields: filterAllFields
  };
})();
