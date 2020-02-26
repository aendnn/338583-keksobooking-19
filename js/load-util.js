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

  var onError = function (message) {
    var error;
    var errorTemplate = document.querySelector('#error').content;
    var errorMessage = errorTemplate.querySelector('.error__message');

    errorMessage.innerHTML = message;
    errorTemplate.cloneNode(true);

    document.body.appendChild(errorTemplate);

    if (document.querySelector('.error')) {
      error = document.querySelector('.error');

      var btnCloseClickHandler = function () {
        window.dialog.closeByBtn(error);
      };

      var btnCloseKeyDownHandler = function (evt) {
        window.dialog.closeByEnter(evt, error);
      };

      var documentKeydownHandler = function (evt) {
        window.dialog.closeByEsc(evt, error);
      };
    }

    var errorClose = error.querySelector('.error__button');
    errorClose.addEventListener('click', btnCloseClickHandler);
    errorClose.addEventListener('keydown', btnCloseKeyDownHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  var onSuccess = function (message) {
    var success = document.querySelector('#success').content;
    var successMessage = success.querySelector('.success__message');

    successMessage.innerHTML = message;
    success.cloneNode(true);

    document.body.appendChild(success);

    if (document.querySelector('.success')) {
      success = document.querySelector('.success');

      var documentKeydownHandler = function (evt) {
        window.dialog.closeByEsc(evt, success);
      };
    }

    document.addEventListener('keydown', documentKeydownHandler);
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
