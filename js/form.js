'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var HousesPrices = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var fields = window.util.form.querySelectorAll('fieldset, input');
  var reset = document.querySelector('.ad-form__reset');

  var addressField = window.util.form.querySelector('#address');

  // добавляет или удаляет атрибуты disabled, в зависимости от флага isActive
  var changeFieldsState = function (array, isActive, isSent) {
    if (!isActive && !isSent) {
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
      addressField.value = (Math.round(window.map.width / 2 - window.mainPin.width)) + ', ' + (Math.round(window.map.height / 2));
    }
  };

  // сбрасывает страницу в неактивное состояние
  var resetPage = function () {
    var pins = document.querySelectorAll('.js-pin');
    window.util.form.reset();
    window.filter.form.reset();
    window.map.clear(pins);
    window.page.deactivate();

    if (document.querySelector('.popup')) {
      var popup = document.querySelector('.popup');
      popup.remove();
    }
  };

  // валидация всех полей
  var validate = function () {
    var roomsCountField = window.util.form.querySelector('#room_number');
    var guestsCountField = window.util.form.querySelector('#capacity');
    var titleField = window.util.form.querySelector('#title');
    var typeField = window.util.form.querySelector('#type');
    var priceField = window.util.form.querySelector('#price');
    var timeInField = window.util.form.querySelector('#timein');
    var timeOutField = window.util.form.querySelector('#timeout');
    var imagesField = window.util.form.querySelector('#images');
    var avatarField = window.util.form.querySelector('#avatar');
    var avatarPreview = window.util.form.querySelector('.ad-form-header__preview img');
    var imagesPreview = window.util.form.querySelector('.ad-form__photo');

    addressField.setAttribute('readonly', 'readonly');

    var checkFieldLength = function (field) {
      if (field.value.length === 0) {
        field.setCustomValidity('Заполните это поле');
      } else {
        field.setCustomValidity('');
      }
    };

    checkFieldLength(titleField);
    checkFieldLength(priceField);

    var getInvalidFields = function () {
      var inputs = window.util.form.querySelectorAll('select, input, textarea');
      var inputsArray = Array.from(inputs);

      inputsArray.forEach(function (input) {
        if (input.validity.customError && !input.validity.valid) {
          input.style.borderColor = 'red';
        }
      });
    };

    // валидация поля заголовка
    var titleFieldChangeHandler = function () {
      titleField.setCustomValidity('Минимум 30 символов, максимум - 100, сейчас: ' + titleField.value.length);


      if ((titleField.value.length >= MIN_TITLE_LENGTH) && (titleField.value.length <= MAX_TITLE_LENGTH)) {
        titleField.setCustomValidity('');
      }
    };

    titleField.addEventListener('change', titleFieldChangeHandler);

    // валидация полей гостей и комнат
    var guestsAndRoomsFieldsChangeHandler = function () {
      roomsCountField.setCustomValidity('Введите корректное значение');
      guestsCountField.setCustomValidity('Слишком много гостей');

      if (roomsCountField.value === guestsCountField.value) {
        roomsCountField.setCustomValidity('');
        guestsCountField.setCustomValidity('');
      } else if ((roomsCountField.value !== '100') && (roomsCountField.value > guestsCountField.value) && (guestsCountField.value !== '100')) {
        roomsCountField.setCustomValidity('');
        guestsCountField.setCustomValidity('');
      }
    };

    guestsCountField.addEventListener('change', guestsAndRoomsFieldsChangeHandler);
    roomsCountField.addEventListener('change', guestsAndRoomsFieldsChangeHandler);

    // валидация файлов
    var validateFile = function (input, preview) {
      input.setCustomValidity('Выберите изображение');


      var file = input.files[0];

      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        input.setCustomValidity('');
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          debugger;
          if (preview.tagName === 'IMG') {
            preview.src = reader.result;
          } else {
            var img = window.card.createElement('img', 'ad-form__img');
            img.width = 70;
            img.height = 70;
            img.src = reader.result;
            preview.appendChild(img);
          }
        });

        reader.readAsDataURL(file);
      }
    };

    var imagesFieldChangeHandler = function () {
      validateFile(imagesField, imagesPreview);
    };

    var avatarFieldChangeHandler = function () {
      validateFile(avatarField, avatarPreview);
    };

    imagesField.addEventListener('change', imagesFieldChangeHandler);
    avatarField.addEventListener('change', avatarFieldChangeHandler);

    // валидация полей чекин/чекаут
    var timeInFieldChangeHandler = function () {
      timeOutField.value = timeInField.value;
    };

    var timeOutFieldChangeHandler = function () {
      timeInField.value = timeOutField.value;
    };

    timeInField.addEventListener('change', timeInFieldChangeHandler);
    timeOutField.addEventListener('change', timeOutFieldChangeHandler);

    // изменяет значение плейсхолдера в зависимости от типа жилья
    var changePlaceholder = function () {
      for (var i = 0; i < window.data.houseTypes.length; i++) {
        if (typeField.value === window.data.houseTypes[i]) {
          priceField.placeholder = HousesPrices[window.data.houseTypes[i].toUpperCase()];
        }
      }
    };

    // валидация полей стоимости и типа жилья
    var priceAndTypeFieldsChangeHandler = function () {
      priceField.setCustomValidity('Введите корректную стоимость');
      var numberPrice = parseInt(priceField.value, 10);

      changePlaceholder();

      if (priceField.type === 'number' && numberPrice > 0) {
        typeField.setCustomValidity('');
        priceField.setCustomValidity('');
      }

      if (typeField.value === 'bungalo' && numberPrice >= 0 && numberPrice <= '1000000') {
        typeField.setCustomValidity('');
        priceField.setCustomValidity('');
      } else if (typeField.value === 'flat' && numberPrice >= 1000 && numberPrice <= '1000000') {
        typeField.setCustomValidity('');
        priceField.setCustomValidity('');
      } else if (typeField.value === 'house' && numberPrice >= 5000 && numberPrice <= '1000000') {
        typeField.setCustomValidity('');
        priceField.setCustomValidity('');
      } else if (typeField.value === 'palace' && numberPrice >= 10000 && numberPrice <= '1000000') {
        typeField.setCustomValidity('');
        priceField.setCustomValidity('');
      }
    };

    typeField.addEventListener('change', priceAndTypeFieldsChangeHandler);
    priceField.addEventListener('change', priceAndTypeFieldsChangeHandler);

    var btnResetHandler = function () {
      resetPage();
    };

    var formSubmitHandler = function (evt) {
      getInvalidFields();
      window.upload.send(new FormData(window.util.form), window.loadUtil.onSuccess, window.loadUtil.onError);
      evt.preventDefault();
    };

    window.util.form.addEventListener('submit', formSubmitHandler);
    reset.addEventListener('click', btnResetHandler);
  };

  window.form = {
    validate: validate,
    resetPage: resetPage,
    changeState: changeFieldsState,
    fieldsets: fields,
    address: addressField,
    addAddress: addAddress
  };
})();
