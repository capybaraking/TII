'use strict';

angular.module('home')
.controller('homeController', ['$scope', '$log', 'PagesEnigmes', function appController ($scope, $log, PagesEnigmes) {//J'ai rajouté le nom du service des énigmes.
    $log = $log.getInstance('homeController');
    $scope.enigmes = new PagesEnigmes();
    /*$scope.listeEnigmes = []; //On n'a pas encore parlé au service, donc c'est une liste vide.
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
*/

    }]);