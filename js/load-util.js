'use strict';

(function () {
  var READY_STATE = 4;
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  };

  var main = document.body.querySelector('main');

  var onError = function (message) {
    var errorTemplate = document.querySelector('#error').content;
    var errorMessage = errorTemplate.querySelector('.error__message');

    errorMessage.innerHTML = message;

    var errorElement = errorTemplate.cloneNode(true);

    if (!document.querySelector('.error')) {
      main.appendChild(errorElement);

      var error = document.querySelector('.error');

      var btnCloseClickHandler = function () {
        window.dialog.closeByBtn(error);
      };

      var btnCloseKeyDownHandler = function (evt) {
        window.dialog.closeByEnter(evt, error);
      };

      var documentKeydownHandler = function (evt) {
        window.dialog.closeByEsc(evt, error);
      };

      var documentClickHandler = function (evt) {
        window.dialog.closeByDocument(evt, errorMessage, error);
      };
    }

    var errorClose = error.querySelector('.error__button');
    errorClose.addEventListener('click', btnCloseClickHandler);
    errorClose.addEventListener('keydown', btnCloseKeyDownHandler);
    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);
  };

  var onSuccess = function (message) {
    var successTemplate = document.querySelector('#success').content;
    var successMessage = successTemplate.querySelector('.success__message');

    successMessage.innerHTML = message;
    var successElement = successTemplate.cloneNode(true);

    if (!main.querySelector('.success')) {
      main.appendChild(successElement);

      var success = main.querySelector('.success');
      var successMessageArea = success.querySelector('.success__message');

      var documentKeydownHandler = function (evt) {
        window.dialog.closeByEsc(evt, success);
      };

      var documentClickHandler = function (evt) {
        window.dialog.closeByDocument(evt, successMessageArea, success);
      };

      document.addEventListener('keydown', documentKeydownHandler);
      document.addEventListener('click', documentClickHandler);
    }
  };

  var xhrErrorHandler = function () {
    onError('Ошибка соединения');
  };

  var xhrTimeoutHandler = function () {
    onError('Запрос не успел выполниться за ' + TIMEOUT_IN_MS + ' мс');
  };

  var checkStatus = function (status) {
    switch (status) {
      case StatusCode.NOT_FOUND:
        onError(StatusCode.NOT_FOUND + '<br>Ничего не найдено');
        break;

      case StatusCode.BAD_REQUEST:
        onError(StatusCode.BAD_REQUEST + '<br>Упс, с вашим запросом что-то не так :(');
        break;

      case StatusCode.SERVICE_UNAVAILABLE:
        onError(StatusCode.SERVICE_UNAVAILABLE + '<br>Сервер временно не отвечает');
        break;

      case StatusCode.INTERNAL_SERVER_ERROR:
        onError(StatusCode.INTERNAL_SERVER_ERROR + '<br>Внутренняя ошибка сервера');
        break;
    }
  };

  window.loadUtil = {
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    READY_STATE: READY_STATE,
    statusCode: StatusCode,
    checkStatus: checkStatus,
    onError: onError,
    onSuccess: onSuccess,
    xhrError: xhrErrorHandler,
    xhrTimeout: xhrTimeoutHandler
  };

})();
