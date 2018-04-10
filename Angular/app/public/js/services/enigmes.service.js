//On va faire le service des énigmes. On aurait pu faire un Provider ou une Factory, les 3 font à peu près pareil, mais c'est la syntaxe qui change
angular
	.module("app") //C'est pour récupérer l'app pour accrocher le service dessus
	.service("enigmes", function($q, $http){ //$q c'est pour faire des promises (des ské try catch) et $http c'est pour pouvoir faire des appels AJAX (communiquer avec l'API)
		//On veut faire une fonction list qui retourne la liste des énigmes
		//Tous les trucs qu'on veut qu'ils soient accessibles dans le service, on fait this.leTruc, et après depuis le 
		//Controller, on pourra faire enigmes.leTruc pour y accéder
		this.list = function(){
			//Elle doit aller récupérer la liste des énigmes dans l'API.
			//On va faire une promise : dans le Controller, on fera une sorte de try catch dessus, pour dire si on a réussi
			//à récupérer la liste des énigmes ou pas.
			var maPromise = $q.defer(); //On crée une promise
			//C'est l'heure d'aller parler à l'API pour récupérer les trucs. On va se servir de $http
			var requete = $http.get("http://localhost:3000/enigmes"); //Ca envoie une requête GET sur l'API qui doit retourner la liste de toutes les énigmes.
			requete.then(function success(reponse){ //Sucess ça veut dire qu'il a réussi à récupérer qqc, mais si ça se trouve,
				//c'est un tableau vide
				//C'est l'ordre des paramètres qui est important : le premier succès, le 2 échec !
				//Si ça a bien marché, dans réponse, on doit avoir une liste d'énigmes : c'est ce qu'on veut retourner.
				//On va mettre la réponse dans la promise, vu qu'on veut pouvoir faire un try catch dessus après
				//On va tester qu'on a récupéré au moins une énigme
				if(typeof reponse.data != "undefined" && reponse.data.length > 0){ //typeof c'est le instanceof de Java, response ça doit être un tableau
					//Ca veut dire que le tableau a au moins un élément
					maPromise.resolve(response.data); //On lui dit que c'est okaaaay et qu'elle doit manger le tableau.
				} else {
					maPromise.reject("Aucune énigme n'a été trouvée, sorry not sorry"); //Ca a pas marché, donc on l'exprime
				}
				return maPromise.promise ; //Chelou, c'est un objet qui contient la promise
			},
			function echec(reponse){//Donc là en cas d'échec
				maPromise.reject("Problème de connexion au serveur : " + reponse.statusText);//On met le code d'erreur avec
				return maPromise.promise;
			}); //On traite la requête selon si ça a marché ou pas


		}
	}); 