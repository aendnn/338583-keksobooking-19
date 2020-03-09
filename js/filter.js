'use strict';

(function () {
  var filterAllFields = function (data) {
    var filterForm = document.querySelector('.map__filters');

    var typeField = filterForm.querySelector('#housing-type');
    var priceField = filterForm.querySelector('#housing-price');
    var roomsField = filterForm.querySelector('#housing-rooms');
    var guestsField = filterForm.querySelector('#housing-guests');
    var featuresFieldset = filterForm.querySelector('#housing-features');

    var adsByHouseType = [];
    var adsByPrice = [];
    var adsByRooms = [];
    var adsByGuests = [];
    var adsByFeatures = [];
    var filteredAds = data;

    window.map.generate(filteredAds, window.map.pins, window.pin.render, filteredAds.length, window.data.TOTAL_ADS);

    var filterFields = function (array, field) {
      array = filteredAds.filter(function (it) {
        return it.offer.type === field.value;
      });

      var pins = document.querySelectorAll('.js-pin');

      filteredAds = array;

      window.map.clear(pins);
      window.map.generate(filteredAds, window.map.pins, window.pin.render, filteredAds.length, window.data.TOTAL_ADS);
    };

    var filterByType = function () {
      filterFields(adsByHouseType, typeField);
    };

    var filterByPrice = function () {
      var checkPrices = function (value, element) {
        var PRICES = [
          'low',
          'middle',
          'high'
        ];

        switch (value) {
          case PRICES[0]:
            return element.offer.price < 10000;

          case PRICES[1]:
            return element.offer.price > 10000 && element.offer.price < 50000;

          case PRICES[2]:
            return element.offer.price > 50000;

          default:
            return element.offer.price;
        }
      };

      adsByPrice = filteredAds.filter(function (it) {
        return checkPrices(priceField.value, it);
      });

      var pins = document.querySelectorAll('.js-pin');
      filteredAds = adsByPrice;

      console.log(filteredAds);

      window.map.clear(pins);
      window.map.generate(filteredAds, window.map.pins, window.pin.render, filteredAds.length, window.data.TOTAL_ADS);
    };

    var filterByRooms = function () {
      adsByRooms = window.data.ads.filter(function (it) {
        return it.offer.rooms.toString() === roomsField.value;
      });

      var pins = document.querySelectorAll('.js-pin');

      window.map.clear(pins);
      window.map.generate(adsByRooms, window.map.pins, window.pin.render, adsByRooms.length, window.data.TOTAL_ADS);
    };

    var filterByGuests = function () {
      adsByGuests = window.data.ads.filter(function (it) {
        return it.offer.guests.toString() === guestsField.value;
      });
      var pins = document.querySelectorAll('.js-pin');

      window.map.clear(pins);
      window.map.generate(adsByGuests, window.map.pins, window.pin.render, adsByGuests.length, window.data.TOTAL_ADS);

    };

    var filterByFeatures = function () {
      var checkedFeaturesBtns = featuresFieldset.querySelectorAll('input[type=checkbox]:checked');
      var checkedFeaturesArray = Array.from(checkedFeaturesBtns);

      adsByFeatures = window.data.ads.filter(function (it) {
        return checkedFeaturesArray.every(function (featureValue) {
          return it.offer.features.includes(featureValue.value);
        });
      });

      var pins = document.querySelectorAll('.js-pin');

      window.map.clear(pins);
      window.map.generate(adsByFeatures, window.map.pins, window.pin.render, adsByFeatures.length, window.data.TOTAL_ADS);
    };

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

    var featuresFieldChangeHandler = function () {
      filterByFeatures();
    };

    featuresFieldset.addEventListener('click', featuresFieldChangeHandler);
  };


  window.filter = {
    allFields: filterAllFields
  };
})();
