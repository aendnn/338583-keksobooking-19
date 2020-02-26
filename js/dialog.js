'use strict';

(function () {
  var closeDialogByBtn = function (dialog) {
    if (dialog !== null) {
      dialog.remove();
    }
  };

  var closeDialogByEnter = function (evt, dialog) {
    if (dialog !== null && evt.key === window.util.ENTER_KEY) {
      dialog.remove();
    }
  };

  var closeDialogByEsc = function (evt, dialog) {
    if (dialog !== null && evt.key === window.util.ESC_KEY) {
      dialog.remove();
    }
  };

  window.dialog = {
    closeByBtn: closeDialogByBtn,
    closeByEnter: closeDialogByEnter,
    closeByEsc: closeDialogByEsc
  };
})();
