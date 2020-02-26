'use strict';

(function () {
  var HousesPrices = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var fieldsets = window.util.form.querySelectorAll('fieldset');
  var submit = document.querySelector('.ad-form__submit');
  var reset = document.querySelector('.ad-form__reset');

  var addressField = window.util.form.querySelector('#address');
  var roomsCountField = window.util.form.querySelector('#room_number');
  var guestsCountField = window.util.form.querySelector('#capacity');
  var titleField = window.util.form.querySelector('#title');
  var typeField = window.util.form.querySelector('#type');
  var priceField = window.util.form.querySelector('#price');
  var timeInField = window.util.form.querySelector('#timein');
  var timeOutField = window.util.form.querySelector('#timeout');
  var imagesField = window.util.form.querySelector('#images');
  var avatarField = window.util.form.querySelector('#avatar');

  // добавляет или удаляет атрибуты disabled, в зависимости от флага isActive
  var changeFieldsetsState = function (array, isActive, isSent) {
    if (!isActive || isActive && isSent) {
      for (var i = 0; i < array.length; i++) {
        array[i].setAttribute('disabled', 'disabled');
      }
    } else {
      for (var j = 0; j < array.length; j++) {
        array[j].removeAttribute('disabled', 'disabled');
      }
    }
  };

  // заполняет поле с адресом
  var addAddress = function (isActive, x, y) {
    if (isActive) {

      if (x && y) {
        addressField.value = x + ', ' + y;
      }
    } else {
      // если страница не активна, координаты метки - центр карты
      addressField.value = (Math.round(window.util.mapWidth / 2 - window.pin.item.width)) + ', ' + (Math.round(window.util.mapHeight / 2));
    }
  };

  // валидация полей гостей и комнат
  var validateGuestsAndRooms = function () {
    roomsCountField.setCustomValidity('Введите корректное значение');
    guestsCountField.setCustomValidity('Слишком много гостей');

    if (roomsCountField.value === guestsCountField.value) {
      roomsCountField.setCustomValidity('');
      guestsCountField.setCustomValidity('');
    } else if ((roomsCountField.value !== '100') && (roomsCountField.value > guestsCountField.value) && (guestsCountField.value !== '100')) {
      roomsCountField.setCustomValidity('');
      guestsCountField.setCustomValidity('');
    }

    if (!roomsCountField.validity.valid) {
      roomsCountField.style.borderColor = 'red';
    }
  };

  // валидация файлов
  var validateFiles = function (file) {
    file.setCustomValidity('Выберите изображение');

    if (file.files[0] && (file.files[0].type === 'image/jpeg' || file.files[0].type === 'image/png')) {
      file.setCustomValidity('');
    }

    if (!file.validity.valid) {
      file.querySelector('label').style.borderColor = 'red';
    }
  };

  // валидация поля заголовка
  var validateTitle = function () {
    titleField.setCustomValidity('Минимум 30 символов, максимум - 100, сейчас: ' + titleField.value.length);

    if ((titleField.value.length >= window.util.MIN_TITLE_LENGTH) && (titleField.value.length <= window.util.MAX_TITLE_LENGTH)) {
      titleField.setCustomValidity('');
    }

    if (!titleField.validity.valid) {
      titleField.style.borderColor = 'red';
    }
  };

  // валидация полей чекин/чекаут
  var validateTime = function () {
    timeInField.setCustomValidity('Выберите корректное значение');
    timeOutField.setCustomValidity('Выберите корректное значение');

    if (timeInField.value === timeOutField.value) {
      timeInField.setCustomValidity('');
      timeOutField.setCustomValidity('');
    }

    if (!titleField.validity.valid) {
      timeInField.style.borderColor = 'red';
    }
  };

  // изменяет значение плейсхолдера в зависимости от типа жилья
  var changePlaceholder = function () {
    for (var i = 0; i < window.data.TYPE_OF_HOUSES.length; i++) {
      if (typeField.value === window.data.TYPE_OF_HOUSES[i]) {
        priceField.placeholder = HousesPrices[window.data.TYPE_OF_HOUSES[i].toUpperCase()];
      }
    }
  };

  // валидация полей стоимости и типа жилья
  var validatePricesAndTypes = function () {
    priceField.setCustomValidity('Введите корректную стоимость');
    typeField.setCustomValidity('Выберите тип жилья соответствующий стоимости');
    var numberPrice = parseInt(priceField.value, 10);

    changePlaceholder();

    if (priceField.type === 'number' && (priceField.value.length !== 0 && priceField.value > '0' && priceField.value <= '1000000')) {
      typeField.setCustomValidity('');
      priceField.setCustomValidity('');
    }

    if (typeField.value === 'bungalo' && numberPrice >= 0) {
      typeField.setCustomValidity('');
      priceField.setCustomValidity('');
    } else if (typeField.value === 'flat' && numberPrice >= 1000) {
      typeField.setCustomValidity('');
      priceField.setCustomValidity('');
    } else if (typeField.value === 'house' && numberPrice >= 5000) {
      typeField.setCustomValidity('');
      priceField.setCustomValidity('');
    } else if (typeField.value === 'palace' && numberPrice >= 10000) {
      typeField.setCustomValidity('');
      priceField.setCustomValidity('');
    }

    if (!priceField.validity.valid) {
      priceField.style.borderColor = 'red';
    }
  };

  // если есть ошибки валидации форма не отправляется
  var showFormErrors = function () {
    for (var i = 0; i < window.util.form.elements.length; i++) {
      if (!window.util.form.elements[i].validity.valid) {
        submit.setAttribute('disabled', 'disabled');
      }
    }
  };

  var btnResetHandler = function (evt) {
    if (evt.target === submit) {
      window.util.form.reset();
    }
  };

  // валидация всех полей
  var validateFields = function () {
    addressField.setAttribute('readonly', 'readonly');

    var avatarFieldChangeHandler = function () {
      validateFiles(avatarField);
    };

    var imagesFieldChangeHandler = function () {
      validateFiles(imagesField);
    };

    var guestsFieldChangeHandler = function () {
      validateGuestsAndRooms();
    };

    var roomsCountFieldChangeHandler = function () {
      validateGuestsAndRooms();
    };

    var titleFieldChangeHandler = function () {
      validateTitle();
    };

    var priceFieldChangeHandler = function () {
      validatePricesAndTypes();
    };

    var typeFieldChangeHandler = function () {
      validatePricesAndTypes();
    };

    var timeInFieldChangeHandler = function () {
      validateTime();
    };

    var timeOutFieldChangeHandler = function () {
      validateTime();
    };

    var formSubmitHandler = function (evt) {
      showFormErrors();
      window.upload.send(new FormData(window.util.form), window.loadUtil.onSuccess, window.loadUtil.onError);
      evt.preventDefault();
    };

    guestsCountField.addEventListener('change', guestsFieldChangeHandler);
    roomsCountField.addEventListener('change', roomsCountFieldChangeHandler);
    titleField.addEventListener('change', titleFieldChangeHandler);
    typeField.addEventListener('change', typeFieldChangeHandler);
    priceField.addEventListener('change', priceFieldChangeHandler);
    timeInField.addEventListener('change', timeInFieldChangeHandler);
    timeOutField.addEventListener('change', timeOutFieldChangeHandler);
    imagesField.addEventListener('change', imagesFieldChangeHandler);
    avatarField.addEventListener('change', avatarFieldChangeHandler);
    window.util.form.addEventListener('submit', formSubmitHandler);
    reset.addEventListener('reset', btnResetHandler);
  };

  window.form = {
    validate: validateFields,
    changeFieldsetsState: changeFieldsetsState,
    fieldsets: fieldsets,
    address: addressField,
    addAddress: addAddress
  };
})();
