define(['angular'], function (angular) {
  'use strict';

  var ModalProvider = {
    options: {
      backdrop: true,
      keyboard: true
    },

    $get: [
      '$rootScope',
      '$q', '$http',
      '$templateCache',
      '$injector',
      '$modalStack',
      '$controller',
      '$interpolate',
      function (
        $rootScope,
        $q,
        $http,
        $templateCache,
        $injector,
        $modalStack,
        $controller,
        $interpolate
      ) {
        var $modal = {};

        function getTemplatePromise(options) {
          return options.template ? $q.when(options.template) :
            $http.get(options.templateUrl,
                {cache: $templateCache}).then(function (result) {
              return result.data;
            });
        }

        function getResolvePromises(resolves) {
          var promisesArr = [];
          angular.forEach(resolves, function (value) {
            if (angular.isFunction(value) || angular.isArray(value)) {
              promisesArr.push($q.when($injector.invoke(value)));
            }
          });
          return promisesArr;
        }

        $modal.interpolate = function (string, locals) {
          return $interpolate(string)(locals);
        };

        $modal.open = function (modalOptions) {
          var modalResultDeferred = $q.defer();
          var modalOpenedDeferred = $q.defer();

          // prepare an instance of a modal to be injected
          // into controllers and returned to a caller
          var modalInstance = {
            result: modalResultDeferred.promise,
            opened: modalOpenedDeferred.promise,
            close: function (result) {
              $modalStack.close(modalInstance, result);
            },
            dismiss: function (reason) {
              $modalStack.dismiss(modalInstance, reason);
            }
          };

          //merge and clean up options
          modalOptions = angular.extend({}, ModalProvider.options, modalOptions);
          modalOptions.resolve = modalOptions.resolve || {};

          //verify options
          if (!modalOptions.template && !modalOptions.templateUrl) {
            throw new Error('One of template or templateUrl options is required.');
          }

          var templateAndResolvePromise =
            $q.all([getTemplatePromise(modalOptions)]
              .concat(getResolvePromises(modalOptions.resolve)));


          templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {
            var modalScope = (modalOptions.scope || $rootScope).$new();
            modalScope.$close = modalInstance.close;
            modalScope.$dismiss = modalInstance.dismiss;

            var ctrlInstance, ctrlLocals = {};
            var resolveIter = 1;

            //controllers
            if (modalOptions.controller) {
              ctrlLocals.$scope = modalScope;
              ctrlLocals.$modalInstance = modalInstance;
              angular.forEach(modalOptions.resolve, function (value, key) {
                ctrlLocals[key] = tplAndVars[resolveIter++];
              });

              ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
            }

            $modalStack.open(modalInstance, {
              scope: modalScope,
              deferred: modalResultDeferred,
              content: tplAndVars[0],
              contentType: modalOptions.contentType,
              backdrop: modalOptions.backdrop,
              keyboard: modalOptions.keyboard,
              windowClass: modalOptions.windowClass,
              windowSize: modalOptions.size,
              title: modalOptions.title
            });

          }, function resolveError(reason) {
            modalResultDeferred.reject(reason);
          });

          templateAndResolvePromise.then(function () {
            modalOpenedDeferred.resolve(true);
          }, function () {
            modalOpenedDeferred.reject(false);
          });

          return modalInstance;
        };

        return $modal;
      }
    ],

  };

  return ModalProvider;

});