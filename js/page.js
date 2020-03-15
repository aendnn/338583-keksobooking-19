'use strict';

(function () {
  // активация страницы
  var activePage = function () {
    window.util.map.classList.remove('map--faded');
    setTimeout('window.data.load(window.data.URL, window.loadUtil.onError)', 1000);
    window.form.active();
    window.form.validate();
    window.map.onInteracte();
    window.filter.onInteracte();
  };

  // деактивация страницы
  var deactivatePage = function () {
    window.util.map.classList.add('map--faded');
    window.util.form.classList.add('ad-form--disabled');
    window.form.changeState(window.form.fieldsets, false);
    window.form.changeState(window.filter.fields, false);
    window.form.addAddress(false);
  };

  // сбрасывает страницу в неактивное состояние
  var resetPage = function () {
    var pins = document.querySelectorAll('.js-pin');
    window.form.noValidate();
    window.form.resetFields();
    window.filter.form.reset();
    window.filter.offInteracte();
    window.map.clear(pins);
    window.card.remove();
    window.page.deactivate();
    window.mainPin.reset();
  };

  deactivatePage();

  window.page = {
    active: activePage,
    deactivate: deactivatePage,
    reset: resetPage
  };
})();
