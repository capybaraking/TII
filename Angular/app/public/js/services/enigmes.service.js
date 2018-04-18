//On va faire le service des énigmes. On aurait pu faire un Provider ou une Factory, les 3 font à peu près pareil, mais c'est la syntaxe qui change
angular
	.module("app") //C'est pour récupérer l'app pour accrocher le service dessus
	//Tout ce qu'on accroche sur this pourra être utilisé par les autres contrôleurs et services
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
		var maPromise = $q.defer() ;
		if (AuthenticationService.isConnected()){
				var data = {question: question, reponse: antwort}; //La date et l'id_utilisateur seront faits sur le serveur
				var requete = $http.post("http://localhost:3000/enigmes", data);
				requete.then(function success(reponse){
					maPromise.resolve(reponse.data);
				}, function echec(reponse){
					maPromise.reject("L'énigme n'a pas été ajoutée : "+ reponse.status + reponse.statusText);
				});
			} else {
				maPromise.reject("Vous n'êtes pas connecté.e");
			}
			return maPromise.promise ;
		};

		//C'est l'heure de faire un service pour répondre à une énigme PAS ZAPPER DE RECUPERER
		this.repondre = function(id_enigme, antwort) {
			var maPromise = $q.defer();
			if(AuthenticationService.isConnected()) {
				//On veut déjà récupérer l'id de l'utilisateur.
				var username = AuthenticationService.username() ; //Dans l'Authentitruc, faut service =~ this
				var reqUserId = $http.get("http://localhost:3000/utilisateurs?mail="+username);
				reqUserId.then(function success(reponse){
					if (typeof reponse.data != "undefined" && data.length > 0) { //Mr Lefebvre dit que quand il y a un ?, la réponse est un tableau.
						var id = reponse.data[0].id ; //On récupère l'id de l'utilisateur
						//Maintenant on veut récupérer la résolution qui contient l'énigme et l'utilisateur
						var reqResolution = $http.get("http://localhost:3000/resolutions?enigmeId="+id_enigme+"&utilisateurId="+id);
						reqResolution.then(function success(reponse){
							if (typeof reponse.data != "undefined" 	&& data.length == 1) { //Mr Lef dit qu'il pourrait y en avoir plusieurs, dans l'absolu.
								//Ca veut dire qu'il existe déjà une tentative de résolution de cette énigme pas l'utilisateur.
								if (reponse.data[0].resolu) { //S'il a déjà résolu l'énigme (c'est un booléen, résolu)
									maPromise.resolve("Hé t'as déjà résolu l'énigme patate");
								} else { //Donc s'il l'a pas déjà résolue, il faut incrémenter le compteur de tentatives
									var ancienCompteur = reponse.data[0].nombre_essais ; //L'ancien nombre de tentatives
									data = {nombre_essais : ancienCompteur + 1, dernier_essai = Date.now()} ; //Qqn a mal fait son boulot et n'a pas rajouté la date dans le serveur
									var reqMAJnbEssais = $http.put("http://localhost:3000/resolutions/"+reponse.data[0].id,data)// Put c'est pour MAJ, on veut MAJ la résolution concernée
									requeteMAJnbEssais.then(function success(reponse){
										estBonneReponse(antwort, id_enigme)
											.then(function(juste){//c'est une promimse
												if(juste){
													data = {resolu:true}
													var reqMAJresolu = $http.put("http://localhost:3000/resolutions/"+reponse.data[0].id, data)
													reqMAJresolu.then(function success(reponse){
														maPromise.resolve("Vous avez trouvé la bonne réponse ! Bravo !");
													}, 
													function echec(err){
														maPromise.reject("Echec de l'enregistrement de votre réponse : " + err.status + ' ' + err.statusText);
													});
												}
											})
											.catch(function(err){
												maPromise.reject(err);
											});
										}, function echec(reponse){
											maPromise.reject("Le compteur n'a pas été incrémenté : "+ response.status + ' '+response.statusText);
										});
								}

							} else if(data.length == 0){
								//S'il n'y a pas de résolution déjà crée, il faut en faire une
								estBonneReponse(antwort, id_enigme)
									.then(function(juste){
										var data = {utilisateurId: id, enigmeId: id_enigme, nombre_essais: 1, dernier_essai: Date.now(), resolu: juste};
										var reqCreerResol = $http.post('http://localhost:3000/resolutions', data);
									}).catch(function(err){
										maPromise.reject(err);
									});

							}else{
								maPromise.reject("Problème avec la BDD");
							}
						}, function echec(reponse){
							maPromise.reject("Echec de connexion à l'API : "+reponse.status + reponse.statusText);
						});

					} else {

						maPromise.reject("Utilisateur non trouvé");
					}
				}, function echec(reponse){
					maPromise.reject("Echec de connexion coté serveur : "+reponse.status + reponse.statusText);
				});
			}else{
				maPromise.reject("Vous devez être connecté");
			}
			return maPromise.promise ;
		};


		function estBonneReponse(antwort, id_enigme){
			var maPromise = $q.defer();
			var requete2 = $http.get("http://localhost:3000/enigmes/"+id_enigme); //On veut récupérer l'énigme qui a l'id qu'on veut
			requete2.then(function success(reponse){
				if(typeof reponse.data != "undefined"){ //typeof c'est le instanceof de Java, response ça doit être un tableau
					//Ca veut dire qu'il y a quelque chose dans l'énigme
					var reponse = reponse.data.reponse; //On lui dit que c'est okaaaay et qu'elle doit manger l'énigme.
					reponse = reponse.upperCase();
					antwort = antwort.upperCase();
					if (antwort === reponse) {
						maPromise.resolve(true);
					}else{
						maPromise.resolve(false);
					}

				} else {
					maPromise.reject("L'énigme ne contient rien"); //Ca a pas marché, donc on l'exprime
				}

			}, function echec(reponse){
				maPromise.reject("L'énigme n'a pas été trouvée : "+ reponse.status + reponse.statusText);
			});
			return maPromise.promise;
		}

	}); 