define(['angular', 'jquery'], function (angular, $) {
  'use strict';

  var AccordionDirective = function () {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: {
        'title': '@',
        'headerClass': '@',
        'template': '@',
        'content': '=',
        'contentType': '@',
        'i': '@',
        'expanded': '@',
        'expandable': '@',
        'expandingCall': '='
      },
      controller: AccordionController,
      link: AccordionLinkFn,
      templateUrl: '/app/common/directives/accordion.tpl.html'
    };
  };

  var AccordionController = function (
    $scope,
    $http,
    $templateCache,
    $compile,
    $timeout
    )
  {
    this._$scope = $scope;
    this._$http = $http;
    this._$templateCache = $templateCache;
    this._$compile = $compile;
    this._$timeout = $timeout;

    angular.extend(
      this._$scope,
      {
        isExpanded: (this._$scope.expanded === 'true'),
        isExpandable: (this._$scope.expandable === 'true')
      }
    );

    this._$scope.accordion = {
      init: false,
      idx: parseInt(this._$scope.i, 10),
      content: this._$scope.content,
      contentType: this._$scope.contentType,
      toggleAccordion: this.toggleAccordion.bind(this)
    };

    $scope.$watch('content', function (accordionContent) {
      $scope.accordion.content = accordionContent;
    });
  };

  // Injected dependencies
  AccordionController.$inject = [
    '$scope',
    '$http',
    '$templateCache',
    '$compile',
    '$timeout'
  ];

  AccordionController.prototype.toggleAccordion = function () {
    this._$scope.isExpanded = !this._$scope.isExpanded;

    if (!this._$scope.accordion.init) {
      if (this._$scope.expandingCall) {
        this._$scope.expandingCall(this._$scope.content, this._$scope.accordion.idx)
        .then(function (content) {
          this._$scope.content = content;
          this._$timeout(function () {
            this.insertTemplate();
          }.bind(this));
        }.bind(this));
      } else {
        this.insertTemplate();
      }
    }
  };

  AccordionController.prototype.insertTemplate = function () {
    var self = this;
    var $targetEl = $(this._$scope.accordion.el).find('.accordion__main');

    this._$http.get(this._$scope.template, {
      cache: this._$templateCache
    }).then(function (res) {
      $targetEl.html(res.data);

      self._$compile($targetEl)(self._$scope);
    });

    this._$scope.accordion.init = true;
  };

  var AccordionLinkFn = function (scope, iElem, iAttrs, controller) {
    angular.extend(
      controller._$scope.accordion,
      {
        el: iElem
      }
    );

    // auto init if expanded
    if (scope.template && scope.isExpanded) {
      controller.insertTemplate();
    }
  };

  return AccordionDirective;
});
