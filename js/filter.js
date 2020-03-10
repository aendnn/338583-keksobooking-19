'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  var typeField = filterForm.querySelector('#housing-type');
  var priceField = filterForm.querySelector('#housing-price');
  var roomsField = filterForm.querySelector('#housing-rooms');
  var guestsField = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');

  var filterPins = function (data) {
    var pins = document.querySelectorAll('.js-pin');

    var adsByHouseType = data.filter(function (it) {
      return it.offer.type === typeField.value;
    });

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

    var adsByPrice = data.filter(function (it) {
      return checkPrices(priceField.value, it);
    });

    var adsByRooms = data.filter(function (it) {
      return it.offer.rooms.toString() === roomsField.value;
    });

    var adsByGuests = data.filter(function (it) {
      return it.offer.guests.toString() === guestsField.value;
    });

    var checkedFeaturesBtns = featuresFieldset.querySelectorAll('input[type=checkbox]:checked');
    var checkedFeaturesArray = Array.from(checkedFeaturesBtns);

    var adsByFeatures = data.filter(function (it) {
      return checkedFeaturesArray.every(function (featureValue) {
        return it.offer.features.includes(featureValue.value);
      });
    });

    var filteredAds = adsByHouseType;
    filteredAds = filteredAds.concat(adsByPrice);
    filteredAds = filteredAds.concat(adsByRooms);
    filteredAds = filteredAds.concat(adsByGuests);
    filteredAds = filteredAds.concat(adsByFeatures);

    var uniqueAds =
    filteredAds.filter(function (it, i) {
      return filteredAds.indexOf(it) === i;
    });

    window.map.clear(pins);
    console.log(filteredAds);
    console.log(uniqueAds);
    window.map.generate(uniqueAds, window.map.pins, window.pin.render, uniqueAds.length, window.data.TOTAL_ADS);
  };

  var fieldsChangeHandler = function () {
    window.debounce(filterPins(window.data.ads));
  };

  typeField.addEventListener('change', fieldsChangeHandler);
  priceField.addEventListener('change', fieldsChangeHandler);
  roomsField.addEventListener('change', fieldsChangeHandler);
  guestsField.addEventListener('change', fieldsChangeHandler);


  window.filter = {
    allFields: filterPins
  };
})();
