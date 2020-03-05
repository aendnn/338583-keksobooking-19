'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeField = filterForm.querySelector('#housing-type');


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

  window.filter = {
    form: filterForm,
    typeField: typeField,
    check: checkTypes
  };
})();
