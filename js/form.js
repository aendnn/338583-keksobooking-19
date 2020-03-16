'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = '1000000';

  var FILE_WIDTH = 70;
  var FILE_HEIGHT = 70;

  var RADIX = 10;

  var HousesPrice = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var roomsCountField = window.util.form.querySelector('#room_number');
  var guestsCountField = window.util.form.querySelector('#capacity');
  var titleField = window.util.form.querySelector('#title');
  var addressField = window.util.form.querySelector('#address');
  var typeField = window.util.form.querySelector('#type');
  var priceField = window.util.form.querySelector('#price');
  var timeInField = window.util.form.querySelector('#timein');
  var timeOutField = window.util.form.querySelector('#timeout');

  var imagesField = window.util.form.querySelector('#images');
  var avatarField = window.util.form.querySelector('#avatar');
  var avatarPreview = window.util.form.querySelector('.ad-form-header__preview img');
  var imagesPreview = window.util.form.querySelector('.ad-form__photo');

  var fields = window.util.form.querySelectorAll('fieldset, input');
  var reset = document.querySelector('.ad-form__reset');

  // добавляет или удаляет атрибуты disabled, в зависимости от флага isActive
  var changeFieldsState = function (array, isActive, isSent) {
    if (!isActive && !isSent) {
      array.forEach(function (field) {
        field.setAttribute('disabled', 'disabled');
      });
    } else {
      array.forEach(function (field) {
        field.removeAttribute('disabled', 'disabled');
      });
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

  // активирует форму
  var activeForm = function () {
    addressField.setAttribute('readonly', 'readonly');
    window.util.form.classList.remove('ad-form--disabled');
    addAddress(true);
    changeFieldsState(fields, true);
  };

  // проверяет на валидность полей
  var checkInvalidField = function (field) {
    if (field.validity.customError || !field.validity.valid) {
      field.style.borderColor = 'red';
    } else {
      field.style.borderColor = '#d9d9d3';
    }
  };

  // валидация заголовка
  var titleFieldChangeHandler = function () {
    titleField.setCustomValidity('Минимум 30 символов, максимум - 100, сейчас: ' + titleField.value.length);

    if ((titleField.value.length >= MIN_TITLE_LENGTH) && (titleField.value.length <= MAX_TITLE_LENGTH)) {
      titleField.setCustomValidity('');
    }

    checkInvalidField(titleField);
  };

  // валидация полей гостей и комнат
  var guestsAndRoomsFieldsChangeHandler = function () {
    guestsCountField.setCustomValidity('Введите корректное кол-во');

    if (roomsCountField.value === guestsCountField.value) {
      guestsCountField.setCustomValidity('');
    } else if ((roomsCountField.value !== '100') && (roomsCountField.value > guestsCountField.value) && (guestsCountField.value !== '100')) {
      guestsCountField.setCustomValidity('');
    }

    checkInvalidField(roomsCountField);
    checkInvalidField(guestsCountField);
  };

  // валидация файлов
  var validateFile = function (input, preview) {
    input.setCustomValidity('Выберите изображение');

    var file = input.files[0];

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      input.setCustomValidity('');
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.tagName === 'IMG') {
          preview.src = reader.result;
        } else {
          var img = window.util.createTag('img', 'ad-form__img');
          img.width = FILE_WIDTH;
          img.height = FILE_HEIGHT;
          img.src = reader.result;
          preview.appendChild(img);
        }
      });

      reader.readAsDataURL(file);

      checkInvalidField(input);
    }
  };

  var resetFields = function () {
    var clearAvatar = function (preview) {
      preview.src = 'img/muffin-grey.svg';
    };

    var clearPhotos = function () {
      var photos = document.querySelectorAll('.ad-form__img');

      window.map.clear(photos);
    };

    var clearPriceMin = function () {
      priceField.min = 5000;
      priceField.placeholder = 5000;
    };

    fields.forEach(function (field) {
      field.style.borderColor = '#d9d9d3';
    });

    window.util.form.reset();
    clearAvatar(avatarPreview);
    clearPhotos();
    clearPriceMin();
  };

  var imagesFieldChangeHandler = function () {
    validateFile(imagesField, imagesPreview);
  };

  var avatarFieldChangeHandler = function () {
    validateFile(avatarField, avatarPreview);
  };

  // валидация полей чекин/чекаут
  var timeInFieldChangeHandler = function () {
    timeOutField.value = timeInField.value;
  };

  var timeOutFieldChangeHandler = function () {
    timeInField.value = timeOutField.value;
  };

  // валидация полей стоимости и типа жилья
  var priceAndTypeFieldsChangeHandler = function () {
    var numberPrice = parseInt(priceField.value, RADIX);

    var checkType = function (value) {
      var price;

      switch (value) {
        case 'bungalo':
          price = HousesPrice.BUNGALO;
          break;

        case 'flat':
          price = HousesPrice.FLAT;
          break;

        case 'house':
          price = HousesPrice.HOUSE;
          break;

        case 'palace':
          price = HousesPrice.PALACE;
          break;
      }

      return price;
    };

    // изменяет значение плейсхолдера в зависимости от типа жилья
    var changeMinPrice = function () {
      window.data.houseTypes.forEach(function (type) {
        if (typeField.value === type) {
          priceField.placeholder = HousesPrice[type.toUpperCase()];
          priceField.min = HousesPrice[type.toUpperCase()];
        }
      });
    };

    priceField.setCustomValidity('Введите корректную стоимость');

    if (priceField.type === 'number' && numberPrice >= checkType(typeField.value) && numberPrice <= MAX_PRICE) {
      priceField.setCustomValidity('');
    }

    changeMinPrice();
    checkInvalidField(priceField);
    checkInvalidField(typeField);
  };

  var btnResetHandler = function () {
    window.page.reset();
  };

  var formSubmitHandler = function (evt) {
    window.upload.form(new FormData(window.util.form), window.loadUtil.onSuccess, window.loadUtil.onError);
    evt.preventDefault();
  };

  // валидация всех полей
  var validate = function () {
    titleField.addEventListener('input', titleFieldChangeHandler);
    guestsCountField.addEventListener('change', guestsAndRoomsFieldsChangeHandler);
    roomsCountField.addEventListener('change', guestsAndRoomsFieldsChangeHandler);
    imagesField.addEventListener('change', imagesFieldChangeHandler);
    avatarField.addEventListener('change', avatarFieldChangeHandler);
    timeInField.addEventListener('change', timeInFieldChangeHandler);
    timeOutField.addEventListener('change', timeOutFieldChangeHandler);
    typeField.addEventListener('change', priceAndTypeFieldsChangeHandler);
    priceField.addEventListener('change', priceAndTypeFieldsChangeHandler);
    window.util.form.addEventListener('submit', formSubmitHandler);
    reset.addEventListener('click', btnResetHandler);
  };

  // удаляет все слушатели
  var removeValidate = function () {
    titleField.removeEventListener('input', titleFieldChangeHandler);
    guestsCountField.removeEventListener('change', guestsAndRoomsFieldsChangeHandler);
    roomsCountField.removeEventListener('change', guestsAndRoomsFieldsChangeHandler);
    imagesField.removeEventListener('change', imagesFieldChangeHandler);
    avatarField.removeEventListener('change', avatarFieldChangeHandler);
    timeInField.removeEventListener('change', timeInFieldChangeHandler);
    timeOutField.removeEventListener('change', timeOutFieldChangeHandler);
    typeField.removeEventListener('change', priceAndTypeFieldsChangeHandler);
    priceField.removeEventListener('change', priceAndTypeFieldsChangeHandler);
    window.util.form.removeEventListener('submit', formSubmitHandler);
    reset.removeEventListener('click', btnResetHandler);
  };

  window.form = {
    validate: validate,
    changeState: changeFieldsState,
    fieldsets: fields,
    address: addressField,
    addAddress: addAddress,
    active: activeForm,
    noValidate: removeValidate,
    resetFields: resetFields
  };
})();
