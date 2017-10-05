define(function () {
  'use strict';

  var ModalBackdropDirective = function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/app/common/directives/modal-backdrop.tpl.html',
      link: function (scope, element) {
        $timeout(function () {
          element.addClass('is-visible');
        });
      }
    };
  };

  ModalBackdropDirective.$inject = ['$timeout'];

  return ModalBackdropDirective;
});