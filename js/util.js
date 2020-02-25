'use strict';

(function () {
  var EXCLUDING_NUMBER = 1;

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_KEYCODE = 0;

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  };

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;

  var form = document.querySelector('.ad-form');

  var checkStatus = function (status, response) {
    switch (status) {
      case StatusCode.OK:
        window.data.getAds(response);
        window.map.generate(window.data.ads, window.map.mapPins, window.pin.render, window.data.adsCount);
        break;
      case StatusCode.NOT_FOUND:
        showError(StatusCode.NOT_FOUND + '<br>Ничего не найдено');
        break;

      case StatusCode.BAD_REQUEST:
        showError(StatusCode.BAD_REQUEST + '<br>Упс, с вашим запросом что-то не так :(');
        break;

      case StatusCode.SERVICE_UNAVAILABLE:
        showError(StatusCode.SERVICE_UNAVAILABLE + '<br>Сервер временно не отвечает');
        break;

      case StatusCode.INTERNAL_SERVER_ERROR:
        showError(StatusCode.INTERNAL_SERVER_ERROR + '<br>Внутренняя ошибка сервера');
        break;
    }
  };

  var isEcsEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEY) {
      action();
    }
  };

  var showError = function (message) {
    var error;
    var errorTemplate = document.querySelector('#error').content;
    var errorMessage = errorTemplate.querySelector('.error__message');

    errorMessage.innerHTML = message;
    errorTemplate.cloneNode(true);

    document.body.appendChild(errorTemplate);


    if (document.querySelector('.error')) {
      error = document.querySelector('.error');

      var onCloseBtnClick = function () {
        if (error !== null) {
          error.remove();
        }
      };

      var onCloseBtnKeydown = function (evt) {
        if (error !== null && evt.key === window.util.ENTER_KEY) {
          error.remove();
        }
      };
    }

    var closeError = function () {
      var errorClose = error.querySelector('.error__button');
      errorClose.addEventListener('click', onCloseBtnClick);
      errorClose.addEventListener('keydown', onCloseBtnKeydown);
    };

    closeError();
  };
  var showSuccess = function (message) {
    var success = document.querySelector('#success').content;
    var successMessage = success.querySelector('.success__message');

    successMessage.innerHTML = message;
    successMessage.cloneNode(true);

    document.body.appendChild(successMessage);
  };

  window.util = {
    map: map,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    form: form,
    EXCLUDING_NUMBER: EXCLUDING_NUMBER,
    ENTER_KEY: ENTER_KEY,
    LEFT_MOUSE_KEYCODE: LEFT_MOUSE_KEYCODE,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    URL: URL,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    statusCode: StatusCode,
    checkStatus: checkStatus,
    isEcsEvent: isEcsEvent,
    isEnterEvent: isEnterEvent,
    showError: showError,
    showSuccess: showSuccess
  };

})();
