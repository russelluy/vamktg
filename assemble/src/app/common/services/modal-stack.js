define(['angular'], function (angular) {
  'use strict';

  var ModalStackFactory = function (
      $document,
      $compile,
      $rootScope,
      $$stackedMap,
      windowService) {

    var OPENED_MODAL_CLASS = 'modal-open';

    var backdropjqLiteEl, backdropDomEl;
    var backdropScope = $rootScope.$new(true);
    var openedWindows = $$stackedMap.createNew();
    var $modalStack = {};

    function backdropIndex() {
      var topBackdropIndex = -1;
      var opened = openedWindows.keys();
      for (var i = 0; i < opened.length; i++) {
        if (openedWindows.get(opened[i]).value.backdrop) {
          topBackdropIndex = i;
        }
      }
      return topBackdropIndex;
    }

    $rootScope.$watch(backdropIndex, function (newBackdropIndex) {
      backdropScope.index = newBackdropIndex + 300;
    });

    function removeModalWindow(modalInstance) {

      var body = $document.find('body').eq(0);
      var modalWindow = openedWindows.get(modalInstance).value;

      //clean up the stack
      openedWindows.remove(modalInstance);

      //remove window DOM element
      modalWindow.modalDomEl.remove();
      body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);

      //remove backdrop if no longer needed
      if (backdropDomEl && backdropIndex() === -1) {
        backdropDomEl.remove();
        backdropDomEl = undefined;
        windowService.setModalMode(false);
      }

      //destroy scope
      modalWindow.modalScope.$destroy();
    }

    $document.bind('keydown', function (evt) {
      var modal;

      if (evt.which === 27) {
        modal = openedWindows.top();
        if (modal && modal.value.keyboard) {
          $rootScope.$apply(function () {
            $modalStack.dismiss(modal.key);
          });
        }
      }
    });

    $modalStack.open = function (modalInstance, modal) {

      openedWindows.add(modalInstance, {
        deferred: modal.deferred,
        modalScope: modal.scope,
        backdrop: modal.backdrop,
        keyboard: modal.keyboard
      });

      var body = $document.find('body').eq(0);

      if (backdropIndex() >= 0 && !backdropDomEl) {
        backdropjqLiteEl = angular.element('<div vx-common-modal-backdrop></div>');
        backdropDomEl = $compile(backdropjqLiteEl)(backdropScope);
        body.append(backdropDomEl);
      }

      var angularDomEl = angular.element('<div vx-common-modal-window></div>');
      angularDomEl.attr({
        'modal-title': modal.title,
        'window-class': modal.windowClass,
        'content-type': modal.contentType || 'generic',
        'window-width': modal.windowSize || 'medium',
        'index': openedWindows.length() - 1
      });
      angularDomEl.html(modal.content);

      var modalDomEl = $compile(angularDomEl)(modal.scope);
      openedWindows.top().value.modalDomEl = modalDomEl;
      body.append(modalDomEl);
      body.addClass(OPENED_MODAL_CLASS);
    };

    $modalStack.close = function (modalInstance, result) {
      var modalWindow = openedWindows.get(modalInstance).value;
      if (modalWindow) {
        modalWindow.deferred.resolve(result);
        removeModalWindow(modalInstance);
      }
    };

    $modalStack.dismiss = function (modalInstance, reason) {
      var modalWindow = openedWindows.get(modalInstance).value;
      if (modalWindow) {
        modalWindow.deferred.reject(reason);
        removeModalWindow(modalInstance);
      }
    };

    $modalStack.getTop = function () {
      return openedWindows.top();
    };

    return $modalStack;
  };

  ModalStackFactory.$inject = [
    '$document',
    '$compile',
    '$rootScope',
    '$$stackedMap',
    'windowService'
  ];

  return ModalStackFactory;
});