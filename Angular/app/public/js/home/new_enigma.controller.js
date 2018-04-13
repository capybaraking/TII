"use strict";
angular.module('home')
.controller('newEnigmaController', ['$scope', 'enigmes', function appController ($scope, enigmes) {
	$scope.question = ""; //lié au champ "énoncé" du formualaire
	$scope.reponse = ""; //lié au champ "solution" du formulaire
	$scope.open = false; //indique si la fenêtre du formulaire doit être ouverte ou pas

	$scope.succes = false; //Pour afficher un message de succès quand l'énigme a été ajoutée ? (pas encore implémenté)
	$scope.erreur = ''; //Pour afficher un message d'erreur si l'énigme n'est pas ajoutée ? (pas encore implémenté)

	/**
	 * Exécuté quand on clique sur le bouton d'ouverture de la fenêtre du formulaire. Ca efface les messages de succès/erreur et ouvre la fenêtre.
	 */
	$scope.openModal = function(){
		$scope.succes = false;
		$scope.erreur = false;
		$scope.open = true;
	}

	/**
	 * Réinitialise le formulaire : vide les champs et referme la fenêtre.
	 */
	$scope.reset = function(){
		$scope.question = "";
		$scope.reponse = "";
		$scope.open = false;
	}

	/**
	 * Executé quand on valide le formulaire et qu'il est complet. Ajoute l'énigme à la BDD et réinitialise le formulaire.
	 */
	$scope.submit = function(){
		enigmes.creation($scope.question, $scope.reponse).then(function(){
			$scope.succes = true;
			console.log("Enigme ajoutée");
			$scope.reset();
		}).catch(function(erreur){
			$scope.erreur = erreur;
			console.log(erreur);
		});
	}
}]);