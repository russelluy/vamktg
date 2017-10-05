define([
  'angular',
  'jquery'
], function (
  angular,
  $
) {
  'use strict';

  var BREAKPOINTS = {
    0: 'small',
    550: 'medium',
    1024: 'large'
  };

  var Window = function () {
    return {
      restrict: 'A',
      controller: WindowController,
      link: WindowLinkFn
    };
  };

  Window.$inject = ['$rootScope'];

  var WindowController = function (
    $scope,
    $rootScope,
    $compile,
    $timeout,
    windowService,
    persistenceService,
    pubSubService) {

    // Reference to the backdrop element in the scope.
    $scope.backdropEl = null;

    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$compile = $compile;
    this.$timeout = $timeout;
    this.windowService = windowService;
    this.persistenceService = persistenceService;

    /**
     * Reference to pubSub service
     * @type {Object}
     */
    this.pubSubService = pubSubService;
  };

  WindowController.prototype.evaluateBreakpoint = function () {
    var self = this;
    var currentBreakpoint = BREAKPOINTS[Object.keys(BREAKPOINTS)[0]];

    // Loop over breakpoints
    for (var breakpoint in BREAKPOINTS) {
      if (breakpoint < this.windowDims.width) {
        currentBreakpoint = BREAKPOINTS[breakpoint];
      }
    }

    if (currentBreakpoint !== this.latestBreakpoint) {
      this.latestBreakpoint = currentBreakpoint;
      this.windowService.setBreakpoint(this.latestBreakpoint);

      // Inform Angular of breakpoint change
      this.$timeout(function () {
        self.$scope.$apply();
      });
    }
  };

  WindowController.prototype.onResize = function () {
    this.windowService.setDimensions(this.windowDims);
    this.evaluateBreakpoint();
  };

  WindowController.prototype.onScroll = function (e) {
    var offset = (window.pageYOffset !== undefined) ?
      e.originalEvent.currentTarget.pageYOffset :
      (document.documentElement || document.body).scrollTop;

    this.windowService.setScrollTop(offset);
  };

  WindowController.prototype.getBreakpoint = function () {
    return this.windowService.breakpoint;
  };

  WindowController.prototype.setBreakpoint = function (newBreakpoint) {
    this.windowService.setBreakpoint(newBreakpoint);
  };

  WindowController.$inject = [
    '$scope',
    '$rootScope',
    '$compile',
    '$timeout',
    'windowService',
    'persistenceService',
    'pubSubService'
  ];

  var WindowLinkFn = function WindowLinkFn(scope, iElem, iAttrs, controller) {
    var windowEl = $(window);
    var isScrolling = false;

    var onResize = angular.bind(controller, function () {
      this.windowDims = {
        height: windowEl.innerHeight(),
        width: windowEl.innerWidth()
      };

      // Inform controller and apply scope
      this.onResize();
    });

    function onBreakpointChange(newBreakpoint, oldBreakpoint) {
      iElem
        .removeClass('bp-' + oldBreakpoint)
        .addClass('bp-' + newBreakpoint);
    }

    function documentTouchMoveHandler(e) {
      e.preventDefault();
    }

    function bodyTouchStartHandler(e) {
      // Only execute the below code once at a time
      if (!isScrolling) {
        isScrolling = true;
        if (e.currentTarget.scrollTop === 0) {
          e.currentTarget.scrollTop = 1;
        } else if (e.currentTarget.scrollHeight ===
              e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
          e.currentTarget.scrollTop -= 1;
        }
        isScrolling = false;
      }
    }

    function bodyTouchMoveHandler(e) {
      e.stopPropagation();
    }

    function onModalModeChange(isModal) {
      var classMethod = (isModal !== true) ? 'removeClass' : 'addClass';
      iElem[classMethod]('is-modal-open');

      var scrollableClass = controller.windowService.scrollableClass();
      var bodyElem = $('body');

      if (isModal && scrollableClass) {
        $(document).on('touchmove', documentTouchMoveHandler);
        bodyElem
          .on('touchstart', scrollableClass, bodyTouchStartHandler)
          .on('touchmove', scrollableClass, bodyTouchMoveHandler);
      } else {
        $(document).off('touchmove', documentTouchMoveHandler);
        bodyElem
          .off('touchstart', scrollableClass, bodyTouchStartHandler)
          .off('touchmove', scrollableClass, bodyTouchMoveHandler);
      }
    }

    function onUiBlockChange(uiBlock) {
      var classMethod = (uiBlock.isBlocked) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-ui-blocked');

      var bodyElem = $('body');

      if (uiBlock.isBlocked && uiBlock.scrollableClass) {
        $(document).on('touchmove', documentTouchMoveHandler);
        bodyElem
          .on('touchstart', uiBlock.scrollableClass, bodyTouchStartHandler)
          .on('touchmove', uiBlock.scrollableClass, bodyTouchMoveHandler);
      } else {
        $(document).off('touchmove', documentTouchMoveHandler);
        bodyElem
          .off('touchstart', uiBlock.scrollableClass, bodyTouchStartHandler)
          .off('touchmove', uiBlock.scrollableClass, bodyTouchMoveHandler);
      }

      if (uiBlock.isBlocked) {
        var backdropEl = angular.element('<div vx-common-modal-backdrop></div>')
          .addClass(uiBlock.backdropClass);
        var backdropScope = controller.$rootScope.$new(true);
        backdropScope.index = 0;

        scope.backdropEl = controller.$compile(backdropEl)(backdropScope);

        bodyElem.append(scope.backdropEl);

        if (uiBlock.clickCallback !== null &&
          typeof uiBlock.clickCallback === 'function') {
          bodyElem.on('click', '.modal__backdrop', uiBlock.clickCallback);
        }

      } else {
        // remove backdrop from body
        if (scope.backdropEl) {
          bodyElem.off('click', '.modal__backdrop', uiBlock.clickCallback);
          $('.modal__backdrop').remove();
        }
      }
    }

    function onNinjaModeChange(isNinja) {
      var classMethod = (isNinja === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('bg-dark');
    }

    function onYtsVisibilityChange(ytsVisible) {
      var classMethod = (ytsVisible === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-yts-visible');
    }

    function onYtsFixedChange(ytsFixed) {
      var classMethod = (ytsFixed === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-yts-fixed');
    }

    function onYtsExpandedChange(ytsExpanded) {
      var classMethod = (ytsExpanded === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-yts-expanded');
    }

    function onHeaderVisibleChange(headerVisible) {
      var classMethod = (headerVisible === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-header-visible');
    }

    function onChromeHiddenChange(chromeHidden) {
      var classMethod = (chromeHidden === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-chrome-hidden');
    }

    function onAdvisoryHiddenChange(advisoryHidden) {
      var classMethod = (advisoryHidden === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-advisory-hidden');
    }

    function onDoubleHeaderChange(doubleHeader) {
      var classMethod = (doubleHeader === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-double-header');
    }

    function onHeaderFixedChange(headerFixed) {
      var classMethod = (headerFixed === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-header-fixed');
    }

    function onStatusVisibleChange(statusVisible) {
      var classMethod = (statusVisible === true) ? 'addClass' : 'removeClass';
      iElem[classMethod]('is-status-bar-fixed');
    }

    function onElevateLoginChange(loggedIn, oldVal) {
      if (loggedIn === oldVal) { return; }

      // use timeout to make sure user data is available
      controller.$timeout(function () {
        var user = controller.persistenceService.getUserData();
        var tier = user && user.tierLevel && user.tierLevel.toLowerCase();

        if (loggedIn === true) {
          iElem.addClass('is-elevate-member-' + tier);
        } else {
          iElem.removeClass(function (index, css) {
            return (css.match(/is-elevate-member-\S+/g) || []).join(' ');
          });
        }
      });
    }

    windowEl
      .on('scroll', controller.onScroll.bind(controller))
      .on('resize', onResize).trigger('resize');

    scope.$watch(
      controller.windowService.breakpoint,
      onBreakpointChange
    );

    scope.$watch(
      controller.windowService.modal,
      onModalModeChange
    );

    scope.$watch(
      controller.windowService.uiBlock,
      onUiBlockChange,
      true
    );

    scope.$watch(
      controller.windowService.ninjaMode,
      onNinjaModeChange
    );

    scope.$watch(
      controller.windowService.ytsVisible,
      onYtsVisibilityChange
    );

    scope.$watch(
      controller.windowService.ytsFixed,
      onYtsFixedChange
    );

    scope.$watch(
      controller.windowService.ytsExpanded,
      onYtsExpandedChange
    );

    scope.$watch(
      controller.windowService.headerVisible,
      onHeaderVisibleChange
    );

    scope.$watch(
      controller.windowService.chromeHidden,
      onChromeHiddenChange
    );

    scope.$watch(
      controller.windowService.advisoryHidden,
      onAdvisoryHiddenChange
    );

    scope.$watch(
      controller.windowService.doubleHeader,
      onDoubleHeaderChange
    );

    scope.$watch(
      controller.windowService.statusBarVisible,
      onStatusVisibleChange
    );

    scope.$watch(
      controller.persistenceService.isLoggedIn,
      onElevateLoginChange
    );

    /*scope.$watch(
      controller.windowService.headerFixed,
      onHeaderFixedChange
    );*/

    controller.pubSubService.subscribe(
      'windowService.headerFixed',
      onHeaderFixedChange
    );
  };

  return Window;

});