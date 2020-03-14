'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  // загружает объявление
  // eslint-disable-next-line no-unused-vars
  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.loadUtil.timeout;

    var xhrLoadHandler = function () {
      if (xhr.readyState === window.loadUtil.readyState) {
        if (xhr.status === window.loadUtil.statusCode.OK) {
          onSuccess('Данные успешно отправлены');
          window.page.reset();
        } else {
          window.loadUtil.checkStatus(xhr.status);
        }
      }
    };

    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('error', window.loadUtil.xhrErrorHandler);
    xhr.addEventListener('timeout', window.loadUtil.xhrTimeoutHandler);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    form: upload
  };
})();
