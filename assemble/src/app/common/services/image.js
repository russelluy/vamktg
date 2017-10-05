define(['angular', 'modernizr'], function (angular, Modernizr) {
	'use strict';
	var ImageService = function (
    $rootScope,
    windowService
    ) {

    this._$rootScope = $rootScope;
    this._windowService = windowService;
		this._images = [];
    this.BREAKPOINT = '';

    this._$rootScope.$watch(
      this._windowService.breakpoint,
      this.onBreakpointChange.bind(this)
    );

		return {
      addImage: this.addImage.bind(this),
      removeImage: this.removeImage.bind(this),
      getImages: this.getImages.bind(this),
      processImages: this.processImages.bind(this)
		};
	};

  ImageService.prototype.addImage = function (image, attrs) {
    // includes the image object to the array control
    this._images.push(image);
    // creates rollover if it has over property
    if (attrs.over) {
      var trigger = (attrs.rolloverTrigger) ?
        image.closest(attrs.rolloverTrigger) : image;

      trigger.on('mouseover mouseout', function (evt) {
        var elem = (attrs.rolloverTrigger) ?
          angular.element($(this).find('img')) : angular.element(this);
        var resolution = (elem.attr('resolution')) ?
          elem.attr('resolution') : '';
        var out = elem.attr('out') + resolution;
        var over = elem.attr('over') + resolution;
        var newSrc = (evt.type === 'mouseover') ? over:out;
        elem.attr('src', newSrc);
      });
    }
    this.processImage(image, attrs.out);
  };

  ImageService.prototype.removeImage = function (image) {
    for (var i = 0, j = this._images.length; i < j; i++) {
      if (this._images[i][0] === image[0]) {
        this._images.splice(i, 1);
        break;
      }
    }
  };

  ImageService.prototype.onBreakpointChange = function (breakpoint) {
    this.BREAKPOINT = breakpoint;
    this.processImages();
  };

  ImageService.prototype.processImages = function () {
    for (var i in this._images) {
      var img = angular.element(this._images[i]);
      this.processImage(img, img.attr('out'));
    }
  };

  ImageService.prototype.processImage = function (_image, _out) {
    var breakpoint = this.BREAKPOINT;
    if (breakpoint !== '') {
      // keep the original aspect ratio for the height, and set the width to X pixels.
      // Ex.: ?resize=Xpx:*
      var sizeAttr = _image.attr(breakpoint);
      var imgRes = (Modernizr.highres) ?
        sizeAttr * 1.5 : sizeAttr;
      var resolution = '?resize=' + imgRes + 'px:*';
      _image.attr('resolution', resolution);
      var out = _out + _image.attr('resolution');
      // fix for quality on JPG images for Akamai
      if (_out.indexOf('.jpg') >= 0) {
        out += '&output-quality=100&output-format=jpg';
      }
      if (_image.attr('src') !== out) {
        _image.attr('src', out);
      }
    }
  };

  ImageService.prototype.getImages = function () {
    return this._images;
  };

	ImageService.$inject = [
    '$rootScope',
    'windowService'
  ];

	return ImageService;
});
