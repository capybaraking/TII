'use strict';

angular.module('home')
.controller('homeController', ['$scope', '$log', 'enigmes', function appController ($scope, $log, enigmes) {//J'ai rajouté le nom du service des énigmes.
    $log = $log.getInstance('homeController');
    $scope.title = 'YAAK - Angular kickstarter';
    $scope.subtitle = '(yet another)';
    $scope.listeEnigmes = []; //On n'a pas encore parlé au service, donc c'est une liste vide.
    //On appelle le service.
    var maNewPromise = enigmes.list(); //La promise c'est pour pouvoir faire des try catch. Dans les services, vaut mieux en mettre.
    //console.log(maNewPromise);
    //QQC NE MARCHE PAS, IL FAUT REVOIR !!!!!!
    console.log(enigmes);
    maNewPromise.then(function(reponse){
        $scope.listeEnigmes = reponse ;
    }).catch(function(messageErreur){
        $log.error(messageErreur);
    }) ; //La liste c'est une promise, donc on fait .then .catch : si la promise a été "résolvée" ou si ça a été un échec.
    //Si pas promise résolue, on met la liste des énigmes dans le $scope, sinon on affiche le message d'erreur qui est récupéré dans la promise.
 /*       [
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
            }];*/
            $scope.components = [
            'angularJS ' + angular.version.full,
            'font awesome',
            'bootstrap',
            '...'
            ];

        // Log-ex tests
        // Init log-ex prefix


    }]);