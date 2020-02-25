'use strict';

(function () {
  // активация страницы
  var activePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.form.classList.remove('ad-form--disabled');
    window.data.load(window.util.showError);
    window.form.changeFieldsetsState(window.form.fieldsets, true);
    window.form.addAddress(true);
    window.form.validate();
  };

  window.activation = {
    active: activePage
  };

  window.form.changeFieldsetsState(window.form.fieldsets, false);
  window.form.addAddress(false);
})();
