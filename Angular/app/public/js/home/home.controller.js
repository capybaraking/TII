'use strict';

angular.module('home')
    .controller('homeController', ['$scope', '$log', function appController ($scope, $log) {

        $scope.title = 'YAAK - Angular kickstarter';
        $scope.subtitle = '(yet another)';
        $scope.listeEnigmes = [
            {
                question: "Je suis le plus beau chat du monde. Qui suis-je ?",
                auteur: "Bibi",
                tags: [
                    "Cool",
                    "Cat",
                    "Beauty",
                    "Black"]
            },
            {
                question: "Je ne sais pas ce qu'est une émotion, mais je fais des grosses colères. Qui suis-je ?",
                auteur: "AB",
                tags: [
                    "Robotique",
                    "IA",
                    "FrenchTech",
                    "Future"]
            },
            {
                question:"Qu'est-ce qui est rose et qui se balance de liane en liane ?",
                auteur: "France Duval",
                tags: [
                    "Sexy",
                    "Jungle",
                    "Hat'venture"
                ]
            },
            {
                question: "La perception est-elle une attitude propositionnelle ?",
                auteur: "Tim Crane",
                tags: [
                    "Headache",
                    "Réflexion",
                    "Philosphie",
                    "Esprit"
                ]
            }];
        $scope.components = [
            'angularJS ' + angular.version.full,
            'font awesome',
            'bootstrap',
            '...'
        ];

        // Log-ex tests
        // Init log-ex prefix
        $log = $log.getInstance('homeController');

        $log.log("Check These cool logs (log)");
        $log.warn("Check These cool logs (warn)");
        $log.info("Check These cool logs (info)");
        $log.error("Check These cool logs (error)");
        $log.debug("Check These cool logs (debug)");
    }]);