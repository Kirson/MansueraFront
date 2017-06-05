/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
        'ngRoute',
        'ngResource',
        'ngCookies',
        'ngDialog',
        'core',
        'oitozero.ngSweetAlert',
        'ExportTableDirectives',
        'ngCsv',
        'ui.date',
        'momentPicker',
        'angularjs-datetime-picker'
    ])
})
(

  
);

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad