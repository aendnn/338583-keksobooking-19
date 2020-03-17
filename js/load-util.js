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

  // проверяет статус ответа
  var checkStatus = function (status) {
    var message;

    switch (status) {
      case StatusCode.NOT_FOUND:
        message = 'Ничего не найдено';
        break;

      case StatusCode.BAD_REQUEST:
        message = 'Упс, с вашим запросом что-то не так :(';
        break;

      case StatusCode.SERVICE_UNAVAILABLE:
        message = 'Сервер временно не отвечает';
        break;

      case StatusCode.INTERNAL_SERVER_ERROR:
        message = 'Внутренняя ошибка сервера';
        break;
    }

    return message;
  };

  // закрывает модальное окно
  var closeModal = function (modal, area, btn) {
    var remove = function () {
      modal.remove();
      document.removeEventListener('keydown', documentKeydownHandler);
      document.removeEventListener('click', documentClickHandler);
    };

    var btnCloseClickHandler = function () {
      remove();
    };

    var btnCloseKeyDownHandler = function (evt) {
      if (evt.key === window.util.enter) {
        remove();
      }
    };

    var documentKeydownHandler = function (evt) {
      if (evt.key === window.util.esc) {
        remove();
      }
    };

    var documentClickHandler = function (evt) {
      var target = evt.target;

      if (target !== area && target !== main) {
        remove();
      }
    };

    if (btn) {
      btn.addEventListener('click', btnCloseClickHandler);
      btn.addEventListener('keydown', btnCloseKeyDownHandler);
    }

    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);
  };

  // функция-коллбэк ошибки
  var errorShowHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content;
    errorTemplate.querySelector('.error__message').textContent = message;

    var errorElement = errorTemplate.cloneNode(true);

    if (!document.querySelector('.error')) {
      main.appendChild(errorElement);
    }

    var error = document.querySelector('.error');
    var errorMessage = error.querySelector('.error__message');
    var errorClose = error.querySelector('.error__button');

    closeModal(error, errorMessage, errorClose);
  };

  // функция-коллбэк успеха
  var successShowHandler = function (message) {
    var successTemplate = document.querySelector('#success').content;
    successTemplate.querySelector('.success__message').textContent = message;

    var successElement = successTemplate.cloneNode(true);

    if (!main.querySelector('.success')) {
      main.appendChild(successElement);
    }

    var success = main.querySelector('.success');
    var successMessage = success.querySelector('.success__message');

    closeModal(success, successMessage);
  };

  var xhrErrorHandler = function () {
    errorShowHandler('Ошибка соединения');
  };

  var xhrTimeoutHandler = function () {
    errorShowHandler('Запрос не успел выполниться за ' + TIMEOUT_IN_MS + ' мс');
  };

  window.loadUtil = {
    timeout: TIMEOUT_IN_MS,
    readyState: READY_STATE,
    statusCode: StatusCode,
    checkStatus: checkStatus,
    onError: errorShowHandler,
    onSuccess: successShowHandler,
    xhrError: xhrErrorHandler,
    xhrTimeout: xhrTimeoutHandler
  };

})();
