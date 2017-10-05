define(function () {
  'use strict';

  var ModalWindowDirective = function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/app/common/directives/modal-window.tpl.html',
      transclude: true,
      scope: {
        index: '@'
      },
      link: ModalWindowLinkFn,
      controller: ModalWindowController
    };
  };

  var ModalWindowController = function ($timeout, $modalStack, windowService) {
    this.$timeout = $timeout;
    this.$modalStack = $modalStack;
    this.windowService = windowService;
  };

  ModalWindowController.$inject = ['$timeout', '$modalStack', 'windowService'];

  var ModalWindowLinkFn = function (scope, element, attrs, controller) {
    var DESKTOP_PADDING = 80;

    // Cache jQuery DOM elems for modal window
    var modalDialogElem = element.find('.modal__dialog');
    var modalHeaderElem = element.find('.modal__header');
    var modalTitleElem = element.find('.modal__title');
    var contentElem = element.find('.modal__content');
    var quickLinks = element.find('[data-quick-links]');

    quickLinks.on('click', 'a', function (e) {
      e.preventDefault();
      var sectionId = $(this).attr('href').replace(/#/, '');
      var sectionToScrollTo = element.find('[data-section="' + sectionId + '"]');
      var scrollTop;

      if (sectionToScrollTo.length) {
        scrollTop = sectionToScrollTo.position().top;
        contentElem.animate({
          // We offset the scroll so we don't cover the title
          scrollTop: scrollTop - 20
        }, 500, 'easeOutCirc');
      }
    });

    // Add content type class to content wrap
    contentElem.addClass('is-' + attrs.contentType);

    // Some
    var isScrollable;
    var isPopupMode;
    var largeModeClass = 'is-popup';

    var winHeight;
    var elemHeight;
    var headerHeight;

    scope.title = attrs.modalTitle || '';
    scope.windowClass = attrs.windowClass || '';
    scope.visible = '';

    // Apply classes for window width and visibility
    element.addClass('is-' + attrs.windowWidth);

    controller.$timeout(function () {
      element.addClass('is-visible');
    });

    // Attach element to scope
    // I don't normally attach to parent, but needs must...
    scope.$parent.windowElem = element;

    scope.$parent.modal = {
      resize: function () {
        controller.$timeout(function () {
          onResize(controller.windowService.dimensions());
        });
      }
    };

    function setScrollable(scrollVal) {
      isScrollable = scrollVal;
      (isScrollable) ? element.addClass('is-scrollable') :
          element.removeClass('is-scrollable');
    }

    function calculateScrollableHeight() {
      var offset;
      var comparator;
      var contentHeight;

      if (isPopupMode) {
        offset = Math.round((winHeight / 2) - (elemHeight / 2));
        comparator = DESKTOP_PADDING / 2;
        contentHeight = winHeight - (DESKTOP_PADDING * 2);
      } else {
        comparator = elemHeight;
        offset = winHeight;
        contentHeight = winHeight;
      }

      if (offset > comparator) {
        if (isScrollable === true || typeof(isScrollable) === 'undefined') {
          setScrollable(false);
        }
      } else {
        if (!isScrollable || typeof(isScrollable) === 'undefined') {
          setScrollable(true);
        }
      }

      if (isScrollable) {
        contentElem.css({
          overflow: 'auto',
          height: contentHeight - 20
        });
      } else {
        contentElem.css({ overflow: 'auto', height: 'auto' });
      }
    }

    function calculateModalPosition() {
      var paddingTop = Math.round((winHeight / 2) - (elemHeight / 2));

      // Set top padding to fit modal
      if (paddingTop > (DESKTOP_PADDING / 2)) {
        element.css('padding-top', paddingTop);
      } else {
        element.css('padding-top', DESKTOP_PADDING / 2);
      }
    }

    function onResize(windowObj) {
      // Temporarily expand content so we can recalculate scrollable area
      contentElem.css({ overflow: 'auto', height: 'auto' });

      winHeight = windowObj.height;
      elemHeight = modalDialogElem.outerHeight();
      headerHeight = modalHeaderElem.outerHeight();

      var mq = controller.windowService.mq('(min-width:769px)');

      if (mq) {
        // Popup mode
        if (isPopupMode === false || typeof(isPopupMode) !== 'boolean') {
          isPopupMode = true;
          element.addClass(largeModeClass);
          modalTitleElem.prependTo(modalHeaderElem);

        }
      // Mobile mode
      } else {
        if (isPopupMode === true || typeof(isPopupMode) !== 'boolean') {
          isPopupMode = false;
          element.removeClass(largeModeClass).css('padding-top', 0);
          modalTitleElem.prependTo(contentElem);
        }
      }

      isPopupMode && calculateModalPosition();
      calculateScrollableHeight();
    }

    // Fire initial call to get window size
    onResize(controller.windowService.dimensions());
    controller.windowService.setModalMode(true, 'modal__content');

    // Bind subscribe for window resize
    controller.windowService.subscribe('windowService.resize', onResize.bind(this));

    // When modal is closed, unsubscribe
    scope.$on('$destroy', function () {
      controller.windowService.unsubscribe('windowService.resize', onResize.bind(this));
    });

    scope.close = function (evt) {
      var modal = controller.$modalStack.getTop();
      if (modal &&
          modal.value.backdrop &&
          modal.value.backdrop !== 'static' &&
          (evt.target === evt.currentTarget)
        ) {
        evt.preventDefault();
        evt.stopPropagation();
        controller.$modalStack.dismiss(modal.key, 'backdrop click');
      }
    };
  };

  return ModalWindowDirective;
});