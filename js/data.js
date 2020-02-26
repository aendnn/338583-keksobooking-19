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

  // eslint-disable-next-line no-unused-vars
  var load = function (url, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.loadUtil.TIMEOUT_IN_MS;

    var xhrLoadHandler = function () {
      if (xhr.readyState === window.loadUtil.READY_STATE) {
        if (xhr.status === window.loadUtil.statusCode.OK) {
          getAds(xhr.response);
          window.map.generate(ads, window.map.pins, window.pin.render, TOTAL_ADS);
        } else {
          window.loadUtil.checkStatus(xhr.status);
        }
      }
    };

    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('error', window.loadUtil.xhrErrorHandler);
    xhr.addEventListener('timeout', window.loadUtil.xhrTimeoutHandler);

    xhr.open('GET', url);
    xhr.send();
  };

  window.data = {
    getAds: getAds,
    ads: ads,
    load: load,
    TYPE_OF_HOUSES: TYPE_OF_HOUSES,
    URL: URL
  };
})();
