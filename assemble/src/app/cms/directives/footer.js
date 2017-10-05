define(function () {
  'use strict';

  var Footer = function () {
    return {
      restrict: 'A',
      controller: FooterController,
      scope: true
    };
  };

  var FooterController =
      function FooterController($scope, $modal, windowService, SiteMapBundle) {
    this._$scope = $scope;
    this._$modal = $modal;
    this._windowService = windowService;

    $scope.footer = {
      modal: false,
      year: new Date(),
      links: SiteMapBundle.siteMap.footer,
      openFooterModal: this.openFooterModal.bind(this),
      getOmega: this.getOmega.bind(this)
    };

    // Subscribe to breakpoint events
    $scope.$watch(
      this._windowService.breakpoint,
      this.onBreakpointChange.bind(this)
    );
  };

  // Add DI annotation for directive controller
  FooterController.$inject = ['$scope', '$modal', 'windowService', 'SiteMapBundle'];

  FooterController.prototype.onBreakpointChange = function (newBreakpoint) {
    this._$scope.footer.breakpoint = newBreakpoint;
  };

  FooterController.prototype.openFooterModal = function () {
    this._$modal.open({
      contentType: 'footer',
      size: 'medium',
      title: 'Where do you want to go?',
      controller: 'FooterModalCtrl',
      templateUrl: '/app/common/templates/modals/footer.tpl.html'
    });
  };

  FooterController.prototype.getOmega = function (index) {
    if (((index + 1) / 6) % 1 === 0) {
      return 'is-omega';
    }
  };

  return Footer;
});