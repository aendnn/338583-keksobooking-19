'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeField = filterForm.querySelector('#housing-type');
  var adsByHouseType = [];

  var checkTypes = function () {
    switch (typeField.value) {
      case window.data.TYPE_OF_HOUSES[0]:
        return typeField.value;

      case window.data.TYPE_OF_HOUSES[1]:
        return typeField.value;

      case window.data.TYPE_OF_HOUSES[2]:
        return typeField.value;

      case window.data.TYPE_OF_HOUSES[3]:
        return typeField.value;

      default:
        return typeField.value;
    }
  };

  var filterByType = function () {

    var typeFieldChangeHandler = function () {
      adsByHouseType = window.data.ads.filter(function (it) {
        return it.offer.type === checkTypes();
      });

      var pins = document.querySelectorAll('.js-pin');
      window.map.clear(pins);

      if (window.filter.typeField.value !== 'any') {
        window.map.generate(adsByHouseType, window.map.pins, window.pin.render, adsByHouseType.length, window.data.TOTAL_ADS);
      } else {
        window.map.generate(window.data.ads, window.map.pins, window.pin.render, window.data.ads.length, window.data.TOTAL_ADS);
      }
    };

    window.filter.typeField.addEventListener('change', typeFieldChangeHandler);
  };

  window.filter = {
    form: filterForm,
    typeField: typeField,
    byType: filterByType
  };
})();
