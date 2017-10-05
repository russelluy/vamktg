define([
  'angular',
  'common/providers/modal',
  'common/services/modal-stack',
  'common/services/modal-stacked-map',
  'common/directives/modal-backdrop',
  'common/directives/modal-window',
  'common/directives/inline-modal',
  'common/controllers/modals/footer',
  'calculator/controllers/calculator',
  'calculator/services/calculator',
  'core/constants/resource-bundle',
  'core/services/window',
  'core/services/pubsub',
  'common/services/image',
  'cms/services/persistence',
  'common/services/utils',
  'cms/directives/header',
  'cms/directives/footer',
  'cms/controllers/deals',
  'common/directives/window',
  'common/directives/global-image',
  'success/constants/flying-with-us',
  'success/constants/entertainment',
  'success/constants/food-and-drink',
  'success/controllers/promotions',
  'success/controllers/entertainment',
  'success/controllers/food-and-drink',
  'routes/constants/routes',
  'routes/controllers/routes',
  'routes/directives/routes-collection',
  'cms/constants/cms',
  'cms/services/cms',
  'common/directives/accordion',
  'common/directives/bind-html-unsafe',
  'elevate/directives/elevate-menu',
  'core/constants/site-map-bundle'

], function (
  angular,
  modalProvider,
  modalStackFactory,
  modalStackedMapFactory,
  ModalBackdropDirective,
  ModalWindowDirective,
  InlineModalDirective,
  FooterModalCtrl,
  CalculatorCtrl,
  calculatorService,
  ResourceBundle,
  windowService,
  pubSubService,
  imageService,
  persistenceService,
  utilsService,
  HeaderDirective,
  FooterDirective,
  DealsCtrl,
  WindowDirective,
  GlobalImageDirective,
  FlyingWithUsBundle,
  EntertainmentBundle,
  FoodAndDrinkBundle,
  PromotionsCtrl,
  EntertainmentCtrl,
  FoodAndDrinkCtrl,
  RoutesBundle,
  RoutesController,
  RoutesCollectionDirective,
  CMS,
  cmsService,
  AccordionDirective,
  BindHtmlUnsafeDirective,
  ElevateMenuDirective,
  SiteMapBundle
) {
  'use strict';

  return angular.module('vxCmsApp', [])

    .constant('SiteMapBundle', SiteMapBundle)
    .directive('vxCommonModalBackdrop', ModalBackdropDirective)
    .directive('vxCommonModalWindow', ModalWindowDirective)
    .directive('vxCommonInlineModal', InlineModalDirective)
    .controller('FooterModalCtrl', FooterModalCtrl)
    .provider('$modal', modalProvider)
    .factory('$modalStack', modalStackFactory)
    .factory('$$stackedMap', modalStackedMapFactory)

    .controller('CalculatorCtrl', CalculatorCtrl)
    
    .controller('DealsCtrl', DealsCtrl)

    .service('calculatorService', calculatorService)

    .constant('ResourceBundle', ResourceBundle)

    .service('windowService', windowService)

    .service('pubSubService', pubSubService)

    .service('imageService', imageService)

    .service('persistenceService', persistenceService)

    .service('utilsService', utilsService)

    .constant('FlyingWithUsBundle', FlyingWithUsBundle)

    .constant('EntertainmentBundle', EntertainmentBundle)

    .constant('FoodAndDrinkBundle', FoodAndDrinkBundle)

    .controller('PromotionsCtrl', PromotionsCtrl)

    .controller('EntertainmentCtrl', EntertainmentCtrl)

    .controller('FoodAndDrinkCtrl', FoodAndDrinkCtrl)

    .constant('RoutesBundle', RoutesBundle)

    .controller('RoutesController', RoutesController)

    .directive('vxRoutesCollection', RoutesCollectionDirective)

    .directive('vxAccordion', AccordionDirective)

    .directive('vxCommonHeader', HeaderDirective)

    .directive('vxCommonFooter', FooterDirective)

    .directive('vxCommonWindow', WindowDirective)

    .directive('vxGlobalImage', GlobalImageDirective)

    .directive('vxElevateMenu', ElevateMenuDirective)

    .directive('vxBindHtmlUnsafe', BindHtmlUnsafeDirective)

    .constant('CMS', CMS)

    .service('cms', cmsService);
});
