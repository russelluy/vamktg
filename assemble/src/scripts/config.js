(function (require) {
  'use strict';

  require.config({
    baseUrl: '/app/',

    name: '../bower_components/almond/almond',

    paths: {
      'angular': '../bower_components/angular/angular',
      'modernizr': '../scripts/modernizr',
      'moment': '../bower_components/momentjs/moment',
      'jquery': '../bower_components/jquery/jquery',
      'pubsub': '../bower_components/js/jquery-tiny-pubsub/ba-tiny-pubsub',
      'tv4': '../bower_components/tv4/tv4',
      'angular-bindonce':
        '../bower_components/angular-bindonce/bindonce',
      'jquery-custom-select':
        '../bower_components/jquery-custom-select/jquery.customSelect',
      'plugins': '../scripts/plugins'
    },

    include: ['../scripts/bootstrap'],

    insertRequire: ['../scripts/bootstrap'],

    shim: {
      'angular': {
        exports: 'angular',
        deps: ['jquery']
      },
      'pubsub': {
        deps: ['jquery']
      },
      'modernizr': {
        exports: ['Modernizr']
      },
      'jquery-custom-select': {
        deps: ['jquery']
      },
      'angular-bindonce': {
        deps: ['angular']
      },
      'tv4': {
        exports: 'tv4'
      }
    },

    deps: [
      '../scripts/bootstrap'
    ],

    wrap: true

  });

}(require));