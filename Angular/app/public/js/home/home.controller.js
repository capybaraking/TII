'use strict';

angular.module('home')
.controller('homeController', ['$scope', '$log', '$state', 'PagesEnigmes', 'AuthenticationService', 'enigmes', function appController ($scope, $log, $state, PagesEnigmes, AuthenticationService, enigmes) {//J'ai rajouté le nom du service des énigmes.
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
    $scope.reponse = "" ; //ML dit que ce n'est pas obligé.
    var idEnigmeRepondue = null ;
    $scope.repondre = function(idEnigme){ //Quand on a cliqué sur répondre donc
        //On vérifie si on est connecté ou pas. Si oui on ouvre la modale pour répondre. Si non on redirige vers la page de connection.
        if(AuthenticationService.isConnected()){
            //Quand on a cliqué sur répondre, on ouvre une autre fenêtre modale. On va aller dans le html (home) la faire.
            $scope.ouvertureReponse = true ;
            //Normalement si on clique dehors, ça repasse à faux tout seul.
            //Ca peut être changé depuis la vue ou le Controller, et quand ça change à un endroit, ça change dans l'autre.
            console.log("Coucou");
            idEnigmeRepondue = idEnigme ;
        }else{
            $state.go('login');
        }

};

    //Maintenant, on utilise le service pour inspecter la réponse.
    $scope.envoyerReponse = function() {
        enigmes.repondre(idEnigmeRepondue, $scope.reponse).then(function success(reponse){
            $log.info(reponse);
            $scope.ouvertureReponse = false ;
            $scope.reponse = "";

            console.log("alors :"+reponse);
        }, function echec(err){
            $log.warn(err);
            console.log('erreur : '+err)
            $scope.reponse ="";
        }) ; //On peut prendre la réponse car on l'a mise dans le scope.
    }
    $scope.ouvertureReponse = false ; //Par défaut, la modale, bah elle s'ouvre pas.
}]);