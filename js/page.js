'use strict';

(function () {
  // активация страницы
  var activePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.form.classList.remove('ad-form--disabled');
    window.data.load(window.data.URL, window.loadUtil.onError);
    window.form.changeState(window.form.fieldsets, true);
    window.form.addAddress(true);
    window.form.validate();
  };

  // деактивация страницы
  var deactivatePage = function () {
    window.util.map.classList.add('map--faded');
    window.util.form.classList.add('ad-form--disabled');
    window.form.changeState(window.form.fieldsets, false);
    window.form.changeState(window.filter.fields, false);
    window.form.addAddress(false);
  };

  deactivatePage();

  window.page = {
    active: activePage,
    deactivate: deactivatePage
  };
})();
