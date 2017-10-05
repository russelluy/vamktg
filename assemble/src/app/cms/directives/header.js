define(['angular', 'jquery'], function (angular, $) {
  'use strict';

  var Header = function Header() {
    return {
      restrict: 'A',
      scope: true,
      controller: HeaderController,
      link: HeaderLinkFn
    };
  };

  var HeaderController = function HeaderController(
    $scope,
    $location,
    persistenceService,
    utilsService,
    windowService
  ) {

    this._$scope = $scope;
    this._$location = $location;
    this._windowService = windowService;
    this._utilsService = utilsService;

    $scope.header = {
      dropdown: {
        navActive: false
      },
      memberAvatar: '',
      getMemberAvatar: '',
      elevateLoggedIn: false,
      mustShowElevateTicker: false,
      elevateUser: {},
      toggleDropdown: this.toggleDropdown.bind(this),
      visible: true
    };

    // Set up watches
    $scope.$watch(
      this._windowService.breakpoint,
      this.onBreakpointChange.bind(this)
    );

    // $scope.$watch(
    //   this._windowService.elevateLogin,
    //   this.onElevateLoginChange.bind(this)
    // );

    // $scope.$watch(
    //   this._windowService.headerVisible,
    //   function (visible) {
    //     $scope.header.visible = visible;
    //   }
    // );

    persistenceService.retrieve();

    $scope.$watch(
      persistenceService.isLoggedIn,
      function (isLoggedIn) {
        angular.extend(
          $scope.header,
          {
            mustShowElevateTicker: isLoggedIn,
            elevateLoggedIn: isLoggedIn,
            elevateUser: persistenceService.getUserData()
          }
        );
        // needs to be after the getUserData call
        angular.extend(
          $scope.header,
          {
            memberAvatar: this.getMemberAvatar()
          }
        );
      }.bind(this)
    );
  };

  // Add DI annotation for directive controller
  HeaderController.$inject = [
    '$scope',
    '$location',
    'persistenceService',
    'utilsService',
    'windowService'
  ];

  HeaderController.prototype.onBreakpointChange =
      function onBreakpointChange(newBreakpoint, oldBreakpoint) {
    this._$scope.header.breakpoint = newBreakpoint;

    if (this._$scope.header.dropdown.navActive &&
      newBreakpoint === 'large' && oldBreakpoint !== 'large') {
      this.toggleDropdown();
    }
  };

  HeaderController.prototype.onElevateLoginChange = function (onPage) {
    this._$scope.header.elevateLogin = onPage;
  };

  HeaderController.prototype.getMemberAvatar = function () {
    if (this._$scope.header.elevateUser && this._$scope.header.elevateUser.avatarCode) {
      var userAvatar = this._$scope.header.elevateUser.avatarCode.avatarCode;
      return (userAvatar) ? userAvatar : this._utilsService.getRandomAvatarsDefault()[0];
    } else {
      return '';
    }
  };

  HeaderController.prototype.toggleDropdown = function (open) {
    // if open/close is not forced, simply toggle the current state
    if (typeof open === 'undefined') {
      open = !this._$scope.header.dropdown.navActive;
    }

    this._$scope.header.dropdown.navActive = open;
    this._windowService.setModalMode(open);
  };

  var HeaderLinkFn = function HeaderLinkFn(scope, elem, attrs, controller) {
    var navDropdownEl = $(elem).find('.js-dropdown');
    var applyWinHeight = function () {
      navDropdownEl.css({
        'height': (controller._windowService.getIOSWindowHeight() - 54) + 'px',
        'box-sizing': 'content-box'
      });
    };
    applyWinHeight();
  };

  return Header;
});
