//Elle était belle cette directive, mais on n'a pas réussi à l'utiliser car on voulait que quand on clique sur le bouton d'une carte
//ça appelle une fonction du Controller et pas de la scope de la directive.
//Moi j'ai une question : comment on sait si on met les fonctions dans une directive ou un controller ????
angular.module("home")
	.directive("carteEnigme",function() {
		return {
			restrict:"E", //C'est pour qu'on puisse créer une nouvelle balise <carteEnigme>
			scope: { //C'est la liste des trucs qu'on va pouvoir utiliser dans le template
				auteur: '=', //Ca veut dire qu'on doit le passer en paramètre : il cherche l'attribut qui s'appelle pareil dans le Controller
				question: '=',/*,
				*/
				date: '=',
				idEnigme: '='
				//tags: '='
			},
			templateUrl: '/js/home/carte_enigme.html'
		}
	});