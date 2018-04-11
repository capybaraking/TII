angular.module("home")
	.directive("carteEnigme",function() {
		return {
			restrict:"E", //C'est pour qu'on puisse créer une nouvelle balise <carteEnigme>
			scope: { //C'est la liste des trucs qu'on va pouvoir utiliser dans le template
				auteur: '=', //Ca veut dire qu'on doit le passer en paramètre : il cherche l'attribut qui s'appelle pareil dans le Controller
				question: '='/*,
				tags: '='*/
			},
			templateUrl: '/js/home/carte_enigme.html'
		}
	});