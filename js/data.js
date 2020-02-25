'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var TOTAL_ADS = 8;
  var TYPE_OF_HOUSES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var ads = [];

  // возвращает массив с объявлениями
  var getAds = function (array) {
    for (var i = 0; i < array.length; i++) {
      ads.push(array[i]);
    }

    return ads;
  };

  var load = function (error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.util.TIMEOUT_IN_MS;

    var onLoad = function () {
      window.util.checkStatus(xhr.status);
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

    xhr.open('GET', URL, true);
    xhr.overrideMimeType('text/html');
    xhr.send();

    if (xhr.readyState === 4) {
      if (xhr.status === window.util.statusCode.OK) {
        getAds(xhr.response);
        window.map.generate(ads, window.map.mapPins, window.pin.render, TOTAL_ADS);
      } else {
        window.util.checkStatus(xhr.status);
      }
    }

  };

  window.data = {
    getAds: getAds,
    ads: ads,
    load: load,
    TYPE_OF_HOUSES: TYPE_OF_HOUSES
  };
})();
