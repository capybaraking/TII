'use strict';

// Application module
angular.module('app')
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

        // App routes
        $stateProvider
            .state({
                name: 'home',
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'homeController'
            })
            .state({
                name: 'dummy',
                url: '/dummy',
                templateUrl: 'dummy/dummy.html',
                controller: 'dummyController'
            })
            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .state({
                name: 'profil',
                url: '/profil',
                templateUrl: 'profil/profil.html',
                controller: 'profilController'
            });

        $urlRouterProvider.otherwise('/');


        // Use the HTML5 History API
        // $locationProvider.html5Mode(true);
    });

