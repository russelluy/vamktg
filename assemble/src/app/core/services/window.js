/**
 * Manages sizing and breakpoints.
 *
 * @class core/services/windowService
 */
define(['jquery', 'modernizr', 'pubsub'], function ($, Modernizr) {
  'use strict';

  var windowService = function (pubSubService) {
    var _window = {
      breakpoint: 'small',

      modalMode: false,

      ninjaMode: false,

      scrollTop: 0,

      scrollableClass: null,

      uiBlock: {
        isBlocked: false,
        clickCallback: null,
        backdropClass: 'modal__backdrop--white'
      },

      statusBarVisible: false,

      headerVisible: true,

      ytsVisible: false
    };

    /**
     * Reference to pubSubService
     */
    this.pubSubService = pubSubService;

    /**
     * @method core/services/windowService~getCurrentBreakpoint
     */
    function getCurrentBreakpoint() {
      return _window.breakpoint;
    }

    /**
     * @method core/services/windowService~setBreakpoint
     * @param newBreakpoint {String} Current breakpoint after change.
     */
    function setBreakpoint(newBreakpoint) {
      _window.breakpoint = newBreakpoint;
    }

    /**
     * @method core/services/windowService~setDimensions
     * @param windowObj
     */
    function setDimensions(windowObj) {
      _window.dimensions = windowObj;
      $.publish('windowService.resize', [windowObj]);
    }

    /**
     * @method core/services/windowService~getWindowDims
     */
    function getWindowDims() {
      return _window.dimensions;
    }

    /**
     * @method core/services/windowService~getScrollPos
     */
    function getScrollTop() {
      return _window.scrollTop;
    }

    /**
     * @method core/services/windowService~setScrollPos
     */
    function setScrollTop(scrollTop) {
      _window.scrollTop = scrollTop;
      $.publish('windowService.scroll', [scrollTop]);
    }

    /**
     * @method core/services/windowService~setModalMode
     * @param isModal
     */
    function setModalMode(isModal) {
      _window.modalMode = isModal;
    }

    /**
     * @method core/services/windowService~getModalMode
     */
    function getModalMode() {
      return _window.modalMode;
    }

    /**
     * @method core/services/windowService~setModalMode
     * @param isModal
     */
    function setUiBlock(isBlocked, clickCallback, backdropClass, scrollableClass) {
      _window.uiBlock = {
        isBlocked: isBlocked,
        clickCallback: clickCallback,
        backdropClass: backdropClass || 'modal__backdrop--white',
        scrollableClass: scrollableClass
      };
    }

    /**
     * @method core/services/windowService~getUiBlock
     */
    function getUiBlock() {
      return _window.uiBlock;
    }

    /**
     * @method core/services/windowService~setChromeHidden
     * @param setChromeHidden {Boolean} Whether the body should
     *    be assigned the class 'is-chrome-hidden'.
     */
    function setHeaderVisible(headerVisible) {
      _window.headerVisible = headerVisible;
    }

    /**
     * @method core/services/windowService~getChromeHidden
     */
    function getHeaderVisible() {
      return _window.headerVisible;
    }

    /**
     * @method core/services/windowService~setChromeHidden
     * @param setChromeHidden {Boolean} Whether the body should
     *    be assigned the class 'is-chrome-hidden'.
     */
    function setChromeHidden(chromeHidden) {
      _window.chromeHidden = chromeHidden;
    }

    /**
     * @method core/services/windowService~getChromeHidden
     */
    function getChromeHidden() {
      return _window.chromeHidden;
    }

    /**
     * @method core/services/windowService~setAdvisoryHidden
     * @param setAdvisoryHidden {Boolean} Whether the body should
     *    be assigned the class 'is-advisory-hidden'.
     */
    function setAdvisoryHidden(advisoryHidden) {
      _window.advisoryHidden = advisoryHidden;
    }

    /**
     * @method core/services/windowService~getAdvisoryHidden
     */
    function getAdvisoryHidden() {
      return _window.advisoryHidden;
    }

    /**
     * @method core/services/windowService~setNinjaMode
     * @param setNinjaMode {Boolean} Whether the body should
     *    be assigned the class 'is-ninja'.
     */
    function setNinjaMode(isNinjaMode) {
      _window.ninjaMode = isNinjaMode;
    }

    /**
     * @method core/services/windowService~ninjaMode
     */
    function getNinjaMode() {
      return _window.ninjaMode;
    }

    function setHeaderFixed(headerFixed) {
      /*jshint validthis:true */
      this.pubSubService.publish(
        'windowService.headerFixed',
        [headerFixed]
      );
      _window.headerFixed = headerFixed;
    }

    function getHeaderFixed() {
      return _window.headerFixed;
    }

    function setDoubleHeader(doubleHeader) {
      _window.doubleHeader = doubleHeader;
    }

    function getDoubleHeader() {
      return _window.doubleHeader;
    }

    // setter and getter for status bar visibility
    function setStatusBarVisible(visible) {
      _window.statusBarVisible = visible;
    }

    function getStatusBarVisible() {
      return _window.statusBarVisible;
    }

    /**
     * @method core/services/windowService~setYtsVisible
     * @param setYtsVisible {Boolean} Whether the body should
     *    be assigned the class 'is-yts-visible'.
     */
    function setYtsVisible(ytsVisible) {
      _window.ytsVisible = ytsVisible;
    }

    function getYtsVisibility() {
      return _window.ytsVisible;
    }

    /**
     * @method core/services/windowService~setYtsFixed
     * @param setYtsFixed {Boolean} Whether the body should
     *    be assigned the class 'is-yts-fixed'.
     */
    function setYtsFixed(ytsFixed) {
      _window.ytsFixed = ytsFixed;
    }

    function getYtsFixed() {
      return _window.ytsFixed;
    }

    /**
     * @method core/services/windowService~setYtsExpanded
     * @param setYtsExpanded {Boolean} Whether the body should
     *    be assigned the class 'is-yts-expanded'.
     */
    function setYtsExpanded(ytsExpanded) {
      _window.ytsExpanded = ytsExpanded;
    }

    function getYtsExpanded() {
      return _window.ytsExpanded;
    }

    function setElevateLogin(onPage) {
      _window.elevateLogin = onPage;
    }

    function getElevateLogin() {
      return _window.elevateLogin;
    }

    function subscribe(eventType, callback) {
      $.subscribe('windowService.' + eventType, function (e, res) {
        callback(res);
      });
    }

    function unsubscribe(eventType, callback) {
      $.unsubscribe('windowService.' + eventType, callback);
    }

    function getScrollableClass() {
      return _window.scrollableClass;
    }

    function matchMedia(query) {
      return Modernizr.mq(query);
    }

    // TODO: using this function fixes a bug in iOS Safari,
    // but we need to test that it works on different devices
    function getIOSWindowHeight() {
      // Get zoom level of mobile Safari
      // Note, that such zoom detection might not work correctly in other browsers
      // We use width, instead of height, because there are no vertical toolbars :)
      var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

      // window.innerHeight returns height of the visible area.
      // We multiply it by zoom and get out real height.
      return window.innerHeight * zoomLevel;
    }

    return {
      setBreakpoint: setBreakpoint,
      breakpoint: getCurrentBreakpoint,
      setDimensions: setDimensions,
      dimensions: getWindowDims,
      setScrollTop: setScrollTop,
      scrollTop: getScrollTop,
      setModalMode: setModalMode,
      modal: getModalMode,
      setUiBlock: setUiBlock,
      uiBlock: getUiBlock,
      setHeaderVisible: setHeaderVisible,
      headerVisible: getHeaderVisible,
      setChromeHidden: setChromeHidden,
      chromeHidden: getChromeHidden,
      setAdvisoryHidden: setAdvisoryHidden,
      advisoryHidden: getAdvisoryHidden,
      setNinjaMode: setNinjaMode,
      ninjaMode: getNinjaMode,
      setHeaderFixed: setHeaderFixed.bind(this),
      headerFixed: getHeaderFixed,
      setDoubleHeader: setDoubleHeader,
      doubleHeader: getDoubleHeader,
      setStatusBarVisible: setStatusBarVisible,
      statusBarVisible: getStatusBarVisible,
      setYtsVisible: setYtsVisible,
      ytsVisible: getYtsVisibility,
      setYtsFixed: setYtsFixed,
      ytsFixed: getYtsFixed,
      setYtsExpanded: setYtsExpanded,
      ytsExpanded: getYtsExpanded,
      setElevateLogin: setElevateLogin,
      elevateLogin: getElevateLogin,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      scrollableClass: getScrollableClass,
      mq: matchMedia,
      getIOSWindowHeight: getIOSWindowHeight
    };
  };

  windowService.$inject = ['pubSubService'];

  return windowService;
});