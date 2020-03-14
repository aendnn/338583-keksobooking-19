'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TOTAL_ADS = 5;

  var TYPE_OF_HOUSES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var ads = [];

  // возвращает массив с объявлениями
  var getAds = function (array) {
    array.forEach(function (ad) {
      if ('offer' in ad) {
        ads.push(ad);
      }
    });

    return ads;
  };

  // загрузка данных с сервера
  // eslint-disable-next-line no-unused-vars
  var load = function (url, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.loadUtil.timeout;

    var xhrLoadHandler = function () {
      if (xhr.readyState === window.loadUtil.readyState) {
        if (xhr.status === window.loadUtil.statusCode.OK) {
          ads = getAds(xhr.response);
          window.form.changeState(window.filter.fields, true);
          ads = window.data.ads.filter(window.filter.ads);
          window.map.generate(ads, window.map.pins, window.pin.render, ads.length, window.data.adsCount);
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
    adsCount: TOTAL_ADS,
    load: load,
    houseTypes: TYPE_OF_HOUSES,
    URL: URL
  };
})();
