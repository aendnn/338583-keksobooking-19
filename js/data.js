'use strict';

(function () {
  var TOTAL_ADS = 8;
  var ads = [];

  // возвращает массив с объявлениями
  var getAds = function (array) {
    for (var i = 0; i < array.length; i++) {
      ads.push(array[i]);
    }

    return ads;
  };

  window.data = {
    adsCount: TOTAL_ADS,
    getAds: getAds,
    ads: ads
  };
})();
