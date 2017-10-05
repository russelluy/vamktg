define(['angular', 'jquery', 'jquery-custom-select'], function (angular, $) {
  'use strict';

  var ElevateMenu = function () {
    return {
      restrict: 'A',
      replace: true,
      controller: ElevateMenuCtrl,
      link: ElevateMenuLinkFn
    };
  };

  var ElevateMenuCtrl = function (
    $scope,
    $timeout,
    persistenceService,
    windowService,
    ResourceBundle
  ) {
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._persistenceService = persistenceService;
    this._windowService = windowService;
    this._resourceBundle = ResourceBundle;

    this._links = ResourceBundle.elevate.navBarLinks;

    this._initCustomSelect = false;

    $scope.elevateMenu = {
      selectMenuOption: this.selectMenuOption.bind(this),
      logOut: this.logOut.bind(this),
      expandedMenu: false,
      expandMenu: this.expandMenu.bind(this),
      desktopView: false
    };

    $scope.$watch(
      persistenceService.isLoggedIn,
      function (isLoggedIn) {
        $scope.elevateMenu.elevateLoggedIn = isLoggedIn;

        this.setDefaultMenuOption();
      }.bind(this)
    );
  };

  ElevateMenuCtrl.$inject = [
    '$scope',
    '$timeout',
    'persistenceService',
    'windowService',
    'ResourceBundle'
  ];

  ElevateMenuCtrl.prototype.setDefaultMenuOption = function () {
    var state = (this._$scope.elevateMenu.elevateLoggedIn) ? 'loggedIn' : 'loggedOut';
    var path = window.location.pathname;
    var option = 0;
    angular.forEach(this._links[state], function (opt, idx) {
      if (path.match(opt.value)) {
        option = idx;
      }
    });

    this._$scope.elevateMenu.menuOptions = this._links[state];
    this._$scope.elevateMenu.selectOption = this._links[state][option];

    // only fire the customSelect method once.
    // select box display dependant on elevateMenu.selectOption, hence the $timeout
    if (!this._initCustomSelect) {
      this._$timeout(function () {
        $('select.nav-row-selectbox').customSelect();
      });
      this._initCustomSelect = true;
    } else {
      this._$timeout(function () {
        $('select.nav-row-selectbox').trigger('render');
      });
    }
  };

  ElevateMenuCtrl.prototype.selectMenuOption = function (option) {
    switch (option.value) {
    case 'default':
      return;
    case 'LOGOUT':
      this.logOut();
      break;
    default:
      document.location.href = option.value;
    }
  };

  ElevateMenuCtrl.prototype.logOut = function () {
    this._persistenceService.doLogout().then(function () {
      document.location.href = '/book';
    }.bind(this));
  };

  ElevateMenuCtrl.prototype.expandMenu = function () {
    this._$scope.elevateMenu.expandedMenu = !this._$scope.elevateMenu.expandedMenu;
  };

  var ElevateMenuLinkFn = function (scope, iElem, iAttrs, controller) {
    var desktopViewTest = function () {
      var winWidth = $(window).width();

      // calculate total width of elevate menu
      var listWidth = 0;
      $(iElem).find('.nav-row-list > li').each(function () {
        listWidth += $(this).outerWidth();
      });

      // test for whether browser is at desktop view
      controller._$timeout(function () {
        controller._$scope.elevateMenu.desktopView = (listWidth + 44) <= winWidth;
      });
    };

    controller._$timeout(function () {
      desktopViewTest();
    }, 500);

    controller._windowService.subscribe('windowService.resize', desktopViewTest);
  };

  return ElevateMenu;
});