'use strict';

// Application module
angular.module('app', [
    'ui.router',
    'ui.materialize',
    'ngAnimate',
    'log.ex.uo',
    'ngMessages',
    'ngStorage',
    'angular-jwt',
    'angular-loading-bar',
    'infinite-scroll',

    'home',
    'dummy'
])
    .config(function (logExProvider, DEBUG) {
        // Log-ex config
        logExProvider.enableLogging(DEBUG);
        logExProvider.overrideLogPrefix(function (className) {
            var $injector = angular.injector(['ng']),
                $filter = $injector.get('$filter'),
                separator = " >> ",
                format = "HH:mm:ss",
                now = $filter('date')(new Date(), format);
            return "" + now + (!angular.isString(className) ? "" : "::" + className) + separator;
        });
    })

    .config(function ($compileProvider, DEBUG) {
        // Enabling or disabling Debug Data
        // make this false in production to make the app faster
        $compileProvider.debugInfoEnabled(DEBUG);
    })

    .config(function ($httpProvider, DEBUG) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.interceptors.push('AuthInterceptor'); //Service pour ajouter le token d'identification dans les requêtes.
        if (DEBUG) {
            $httpProvider.interceptors.push('httpLoggerInterceptor');
        }
    });
