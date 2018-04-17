"use strict";


/**
Ce service permet de récupérer les énigmes page par page pour quand on scroll.
*/
angular
.module("app")
.factory("PagesEnigmes", function($http){
	var limit = 10; //Nombre d'énigmes à récupérer à la fois

	var PagesEnigmes = function(){
		this.items = []; //la liste des énigmes récupérées depuis le début
		this.busy = false; //est-ce qu'on est en train de récupérer des énigmes ?
		this.page = 1; //La dernière page récupérée
		this.totalCount = null; //Le nombre max d'énigmes dans la BDD
		this.error = false;
	};

	/**
	Récupère la page d'énigmes suivante et l'ajoute à la liste
	*/
	PagesEnigmes.prototype.nextPage = function(){
		if(this.busy){
			return;
		}
		this.busy = true;

		var url = "http://localhost:3000/enigmes?_expand=utilisateur&_sort=date&_order=desc&_page=" + this.page +"&_limit=" + limit;
		//On trie les énigmes par ordre décroissant de dates, les & c'est les paramètres du GET
		$http.get(url).then(function success(response){
			if(response.headers("X-Total-Count") != null){
				this.totalCount = response.headers("X-Total-Count"); //JSON-server retourne le nombre total d'items dans le header X-Total-Count
			}
			if(this.items.length < this.totalCount){ //Si on n'a pas encore récupéré tous les items
				//Comme on ne peut pas faire de forEach on doit itérer avec un i
				var items = response.data;
				for(var i = 0; i < items.length; i++){
					this.items.push(items[i]); //On ajoute toutes les énigmes à la liste
				}
				this.page += 1;
			}
			this.busy = false;
			}.bind(this), //C'est pour passer le this par référence à la fonction success 

			function error(err){
				//Faudrait faire quelque chose là quand même...
				this.error = true;
				this.busy = false;
			}.bind(this));
	};

	return PagesEnigmes;

});