//On va faire le service des énigmes. On aurait pu faire un Provider ou une Factory, les 3 font à peu près pareil, mais c'est la syntaxe qui change
angular
	.module("app") //C'est pour récupérer l'app pour accrocher le service dessus
	.service("enigmes", function($q, $http, AuthenticationService){ //$q c'est pour faire des promises (des ské try catch) et $http c'est pour pouvoir faire des appels AJAX (communiquer avec l'API)
		//Authentitruc c'est le service pour gérer les connexions/décos à l'API, il a un truc isConnected.
		//On veut faire une fonction list qui retourne la liste des énigmes
		//Tous les trucs qu'on veut qu'ils soient accessibles dans le service, on fait this.leTruc, et après depuis le 
		//Controller, on pourra faire enigmes.leTruc pour y accéder
		this.list = function(){ //C'est pour retourner la liste des énigmes.
			//Elle doit aller récupérer la liste des énigmes dans l'API.
			//On va faire une promise : dans le Controller, on fera une sorte de try catch dessus, pour dire si on a réussi
			//à récupérer la liste des énigmes ou pas.
			var maPromise = $q.defer(); //On crée une promise
			//C'est l'heure d'aller parler à l'API pour récupérer les trucs. On va se servir de $http
			var requete = $http.get("http://localhost:3000/enigmes?_expand=utilisateur"); //Ca envoie une requête GET sur l'API qui doit retourner la liste de toutes les énigmes.
			//expand utilisateur c'est pour faire la jointure avec la table utilisateur pour récupérer l'id de l'utilisateur : c'est pas du tout sécurisé mais OSEF
			requete.then(function success(reponse){ //Sucess ça veut dire qu'il a réussi à récupérer qqc, mais si ça se trouve,
				//c'est un tableau vide
				//C'est l'ordre des paramètres qui est important : le premier succès, le 2 échec !
				//Si ça a bien marché, dans réponse, on doit avoir une liste d'énigmes : c'est ce qu'on veut retourner.
				//On va mettre la réponse dans la promise, vu qu'on veut pouvoir faire un try catch dessus après
				//On va tester qu'on a récupéré au moins une énigme
				if(typeof reponse.data != "undefined" && reponse.data.length > 0){ //typeof c'est le instanceof de Java, response ça doit être un tableau
					//Ca veut dire que le tableau a au moins un élément
					maPromise.resolve(reponse.data); //On lui dit que c'est okaaaay et qu'elle doit manger le tableau.
				} else {
					maPromise.reject("Aucune énigme n'a été trouvée, sorry not sorry"); //Ca a pas marché, donc on l'exprime
				}
			},
			function echec(reponse){//Donc là en cas d'échec
				maPromise.reject("Problème de connexion au serveur : " + reponse.status + " " +reponse.statusText);//On met le code d'erreur avec
			}); //On traite la requête selon si ça a marché ou pas
			return maPromise.promise ; //Chelou, c'est un objet qui contient la promise. Le return il faut bien le mettre tout à la fin.
//Faudra voir pour trier les résultats, ou je sais pas quoi.
		};


		this.creation = function(question, antwort){ //C'est pour créer une nouvelle énigme.
			var maPromise = $q.defer ;
			if (AuthenticationService.isConnected()){
				var data = {question: question, reponse: antwort}; //La date et l'id_utilisateur seront faits sur le serveur
				var requete = $http.post("http://localhost:3000/enigmes", data);
				requete.then(function success(reponse){
					maPromise.resolve(reponse.data);
				}, function echec(reponse){
					maPromise.reject("L'énigme n'a pas été ajoutée : "+ reponse.status);
				});
			} else {
				maPromise.reject("Vous n'êtes pas connecté.e");
			}
			return maPromise.promise ;
		};

	}); 