angular
	.module("app") //C'est pour récupérer l'app pour accrocher le service dessus
	.service("inscription", function($q, $http){ //$q c'est pour faire des promises (des ské try catch) et $http c'est pour pouvoir faire des appels AJAX (communiquer avec l'API)
		

		this.createAccount = function(username,mail,mdp){ //C'est pour créer une nouvelle énigme.
			var maPromise = $q.defer() ;
			if (username.length>4){
				var data = {pseudo: username, mail: mail,password:mdp}; //La date et l'id_utilisateur seront faits sur le serveur
				var requete = $http.post("http://localhost:3000/utilisateurs", data);
				requete.then(function success(reponse){
					maPromise.resolve(reponse.data);
				}, function echec(reponse){
					maPromise.reject("Votre compte n'a pas pu être créé : "+ reponse.status + reponse.statusText);
				});
			} else {
				maPromise.reject("Votre nom d'utilisateur doit comporter au moins 3 caractères.");
			}
			return maPromise.promise ;
		};

	}); 