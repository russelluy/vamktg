define(function () {
  'use strict';
	var BindHtmlUnsafeDirective = function () {
		return function ($scope, $element, $attrs) {
			var htmlName = $attrs.vxBindHtmlUnsafe;
			$scope.$watch(htmlName, function (newHTML) {
				if (!newHTML) {
					return;
				}
				var e = document.createElement('div');
				e.innerHTML = newHTML;
				newHTML = e.childNodes[0].nodeValue;
				$element.html(newHTML);
			});
		};
	};

  return BindHtmlUnsafeDirective;
});