'use strict';

(function () {
  var fieldsets = window.util.form.querySelectorAll('fieldset');
  var addressField = window.util.form.querySelector('#address');

  // добавляет или удаляет атрибуты disabled, в зависимости от флага isActive
  var changeFieldsetsState = function (array, isActive) {
    if (isActive) {
      for (var i = 0; i < array.length; i++) {
        array[i].removeAttribute('disabled', 'disabled');
      }
    } else {
      for (var j = 0; j < array.length; j++) {
        array[j].setAttribute('disabled', 'disabled');
      }
    }
  };

  // заполняет поле с адресом
  var addAddress = function (isActive) {
    if (isActive) {
      // координаты острого конца метки
      addressField.value = (Math.round(window.pins.main.offsetLeft + window.pins.item.getPointer(window.pins.item.mainWidth))) +
        ', ' +
        (Math.round(window.pins.main.offsetTop + window.pins.item.mainHeight));
    } else {
      // если страница не активна, координаты метки - центр карты
      addressField.value = (Math.round(window.pins.mapWidth / 2)) + ', ' + (Math.round(window.pins.mapHeight / 2));
    }
  };

  // активация страницы
  var activePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.form.classList.remove('ad-form--disabled');
    window.data.getAds(window.data.ads, window.data.adsCount);
    window.util.generate(window.data.ads, window.pins.mapPins, window.pins.render);
    changeFieldsetsState(fieldsets, true);
    addAddress(true);
    window.form.validate();
  };

  // по клику на метку активируется страница
  var onPinMainSelectorMouseDown = function (evt) {
    if (window.util.map.classList.contains('map--faded')) {
      if (evt.button === window.util.LEFT_MOUSE_KEYCODE) {
        activePage();
      }
    }
  };

  // по клику на enter активируется страница
  var onPinMainSelectorKeydown = function (evt) {
    if (window.util.map.classList.contains('map--faded')) {
      if (evt.key === window.util.ENTER_KEY) {
        activePage();
      }
    }
  };

  window.activation = {
    disableFields: changeFieldsetsState,
    addAddress: addAddress,
    active: activePage
  };

  window.activation.disableFields(fieldsets, false);
  window.activation.addAddress(false);

  window.pins.main.addEventListener('mousedown', onPinMainSelectorMouseDown);
  window.pins.main.addEventListener('keydown', onPinMainSelectorKeydown);
})();
