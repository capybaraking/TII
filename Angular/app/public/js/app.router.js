'use strict';

// Application module
angular.module('app')
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

        // App routes
        $stateProvider
            .state({
                name: 'home', //Le nom de l'état pour pouvoir faire un lien vers lui avec ui-sref dans le html
                url: '/', //l'url de la page
                templateUrl: 'home/home.html', //le fichier html qui doit être mis dans ui-view
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
            /*
            Pour le profil on crée des sous-états et des sous-vues. Comme ça le menu à gauche est toujours affiché et pas actualisé, 
            seulement le contenu de la page. 
             */
            .state({ //Là c'est le "cadre" d'une page du profil : juste le menu à gauche.
                name: 'profil',
                url: '/profil',
                templateUrl: 'profil/profil.html',
                controller: 'profilController',
                redirectTo: 'profil.informations' //sous-état par défaut (la page informations)
            })
                //Dans le profil.html, il y a une div ui-view qui est complétée grâce aux sous-états suivants.
                .state({
                    name: 'profil.informations', //le point signifie que c'est un sous état de profil
                    url: '/informations', //Comme c'est un sous-état, l'url de la page est en fait /profil/informations
                    templateUrl:'profil/profil.informations.html', //C'est le fichier qui remplit le ui-view de profil.html.
                    controller: 'profilController'
                })
                .state({
                    name: 'profil.enigma',
                    url: '/mesEnigmes',
                    templateUrl: 'profil/profil.enigma.html',
                    controller: 'profilController'
                })
                .state({
                    name: 'profil.resolues',
                    url: '/resolues',
                    templateUrl: 'profil/profil.resolues.html',
                    controller: 'profilController'
                })
                .state({
                    name: 'profil.non_resolues',
                    url: '/nonResolues',
                    templateUrl: 'profil/profil.non_resolues.html',
                    controller: 'profilController'
                })
                .state({
                    name: 'profil.suivies',
                    url: '/suivies',
                    templateUrl: 'profil/profil.suivies.html',
                    controller: 'profilController'
                })
                .state({
                    name: 'profil.achievements',
                    url: '/achievements',
                    templateUrl: 'profil/profil.achievements.html',
                    controller: 'profilController'
                });
        $urlRouterProvider.otherwise('/');


        // Use the HTML5 History API
        // $locationProvider.html5Mode(true);
    });
