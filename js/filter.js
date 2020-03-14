'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterFields = filterForm.querySelectorAll('select, input');
  var typeField = filterForm.querySelector('#housing-type');
  var priceField = filterForm.querySelector('#housing-price');
  var roomsField = filterForm.querySelector('#housing-rooms');
  var guestsField = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');

  // проверяет значение поля цены
  var checkPrices = function (value, element) {
    var PRICES = [
      'low',
      'middle',
      'high'
    ];

    switch (value) {
      case PRICES[0]:
        return element < 10000;

      case PRICES[1]:
        return element > 10000 && element < 50000;

      case PRICES[2]:
        return element > 50000;

      default:
        return element;
    }
  };

  // возвращают объявления по заданному фильтру

  var filterByType = function (data) {
    return typeField.value === 'any' ||
      typeField.value === data.offer.type;
  };

  var filterByPrice = function (data) {
    return priceField.value === 'any' ||
      checkPrices(priceField.value, data.offer.price);
  };

  var filterByRooms = function (data) {
    return roomsField.value === 'any' ||
      roomsField.value === data.offer.rooms.toString();
  };

  var filterByGuests = function (data) {
    return guestsField.value === 'any' ||
      guestsField.value === data.offer.guests.toString();
  };

  var filterByFeatures = function (data) {
    var checkedFeaturesBtns = featuresFieldset.querySelectorAll('input[type=checkbox]:checked');
    var checkedFeaturesArray = Array.from(checkedFeaturesBtns);
    return checkedFeaturesArray.every(function (featureValue) {
      return data.offer.features.includes(featureValue.value);
    });
  };

  var filterAdverts = function (data) {
    return filterByType(data) &&
      filterByPrice(data) &&
      filterByRooms(data) &&
      filterByGuests(data) &&
      filterByFeatures(data);
  };

  var fieldsChangeHandler = function () {
    var pins = document.querySelectorAll('.js-pin');

    window.debounce(function () {
      var filteredAdverts = window.data.ads.filter(filterAdverts);
      window.map.generate(filteredAdverts, window.map.pins, window.pin.render, filteredAdverts.length, window.data.adsCount);
      window.map.clear(pins);
      window.card.remove();
    });
  };

  var addInteracteWithFilters = function () {
    typeField.addEventListener('change', fieldsChangeHandler);
    priceField.addEventListener('change', fieldsChangeHandler);
    roomsField.addEventListener('change', fieldsChangeHandler);
    guestsField.addEventListener('change', fieldsChangeHandler);
    featuresFieldset.addEventListener('change', fieldsChangeHandler);
  };

  var RemoveinteracteWithFilters = function () {
    typeField.removeEventListener('change', fieldsChangeHandler);
    priceField.removeEventListener('change', fieldsChangeHandler);
    roomsField.removeEventListener('change', fieldsChangeHandler);
    guestsField.removeEventListener('change', fieldsChangeHandler);
    featuresFieldset.removeEventListener('change', fieldsChangeHandler);
  };

  window.filter = {
    form: filterForm,
    fields: filterFields,
    ads: filterAdverts,
    onInteracte: addInteracteWithFilters,
    offInteracte: RemoveinteracteWithFilters
  };
})();
