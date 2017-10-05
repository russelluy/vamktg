define(function () {
  'use strict';

  var InlineModalDirective = function () {
    return {
      restrict: 'A',
      scope: true,
      replace: true,
      transclude: true,
      controller: InlineModalController,
      link: InlineModalLinkFn,
      templateUrl: '/app/common/directives/modal.tpl.html'
    };
  };

  var InlineModalController = function ($scope, $parse, windowService) {
    this._$scope = $scope;
    this._$parse = $parse;
    this._windowService = windowService;

    this._$scope.modal = {
      breakpoint: {},
      show: false
    };

    $scope.$watch(
      this._windowService.breakpoint,
      this.onBreakpointChange.bind(this)
    );
  };

  InlineModalController.$inject = [
    '$scope',
    '$parse',
    'windowService'
  ];

  InlineModalController.prototype.onBreakpointChange = function (newBreakpoint) {
    this._$scope.modal.breakpoint.small =
      (newBreakpoint === 'small') ? true : false;

    if (this._$scope.modal.breakpoint.small && this._$scope.modal.show) {
      this._$scope.modal.show = true;
      this._windowService.setModalMode(true);
    } else if (this._$scope.modal.show) {
      this._$scope.modal.show = false;
      this._windowService.setModalMode(false);
    }
  };

  InlineModalController.prototype.onShowChange = function (isModalShown) {
    this._$scope.modal.show = (isModalShown) ? true : false;

    // if (this._$scope.modal.breakpoint.small) {
    //   //this._windowService.setModalMode(isModalShown);
    // }
  };

  var InlineModalLinkFn = function (scope, iElem, iAttrs, controller) {
    // Watch when modal show changes
    scope.$watch(
      iAttrs.show,
      controller.onShowChange.bind(controller)
    );

    scope.closeModal = function () {
      controller._$parse(iAttrs.onClose)(scope);
    };
  };

  return InlineModalDirective;
});