'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksoboodking';

  // загружает объявление
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
          onError(window.loadUtil.checkStatus(xhr.status));
        }
      }
    };

    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('error', window.loadUtil.xhrError);
    xhr.addEventListener('timeout', window.loadUtil.xhrTimeout);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    form: upload
  };
})();
