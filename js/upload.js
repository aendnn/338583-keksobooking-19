'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
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

      default:
        throw new Error('Ошибка');
    }
  };

  var load = function (error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    var onLoad = function () {
      checkStatus(xhr.status, xhr.response);
    };

    var onError = function () {
      error('Ошибка соединения');
    };

    var onTimeout = function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    };

    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onTimeout);

    xhr.open('GET', URL);
    xhr.send();
  };

  window.upload = {
    showError: showError,
    showSuccess: showSuccess,
    load: load
  };

})();
