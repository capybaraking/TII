'use strict';

// Application module
angular.module('app')
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

        // App routes
        $stateProvider
            .state({
                name: 'home', //Le nom de l'état pour pouvoir faire un lien vers lui avec ui-sref dans le html
                url: '/', //l'url de la page
                templateUrl: 'home/home2.html', //le fichier html qui doit être mis dans ui-view
                controller: 'homeController' //le controller qui doit être utilisé
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
            })
            .state({
                name: 'user-enigma',
                url: '/profil_mesEnigmes',
                templateUrl: 'profil/profil_UserEnigma.html',
                controller: 'profilController'
            })
            .state({
                name: 'resolved-enigma',
                url: '/profil_resolues',
                templateUrl: 'profil/profil_UserResolved.html',
                controller: 'profilController'
            })
            .state({
                name: 'not-resolved-enigma',
                url: '/profil_nonResolues',
                templateUrl: 'profil/profil_UserNotResolved.html',
                controller: 'profilController'
            })
            .state({
                name: 'followed-enigma',
                url: '/profil_suivies',
                templateUrl: 'profil/profil_UserFollowedEnigma.html',
                controller: 'profilController'
            })
            .state({
                name: 'achievements',
                url: '/profil_achievements',
                templateUrl: 'profil/profil_Achievements.html',
                controller: 'profilController'
            });
        $urlRouterProvider.otherwise('/');


        // Use the HTML5 History API
        // $locationProvider.html5Mode(true);
    });
