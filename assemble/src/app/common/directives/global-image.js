define(function () {
  'use strict';

  var GlobalImageDirective = function () {
    return {
      restrict: 'A',
      scope: false,
      controller: ImageCtrl,
      link: ImageLinkFn
    };
  };

  var ImageCtrl = function (imageService) {
    this.imageService = imageService;
  };

  ImageCtrl.$inject = [
    'imageService'
  ];

  var ImageLinkFn = function (scope, elem, attrs, controller) {
		controller.imageService.addImage(elem, attrs);
    scope.$on('$destroy', function () {
      controller.imageService.removeImage(elem);
    });
	};

  return GlobalImageDirective;
});