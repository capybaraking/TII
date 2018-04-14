'use strict';

/**
 * Ce service "intercepte" toutes les requêtes Ajax et ajoute le token d'identification dans le header si l'utilisateur est connecté.
 */
angular.module('app')
	.factory('AuthInterceptor', function ($q, $localStorage, jwtHelper) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				//Pour vérifier qu'on est bien connecté on ne peut pas utiliser l'AuthenticationService car ça ferait une référence circulaire
				// (l'AuthService fait une requête http, qui déclenche cet interceptor, qui appelle l'AuthService etc...)
				// du coup j'ai recopié le code ici pour vérifier que le token est présent et valide. 
				// Il y aurait sans doute un autre pattern plus propre...
				if($localStorage.currentUser){
					if(!jwtHelper.isTokenExpired($localStorage.currentUser.token)){
						config.headers.Authorization = 'Bearer ' + $localStorage.currentUser.token;
					}
				}
				return config;
			},

			responseError: function (response) {
				if (response.status === 401) {
					delete $localStorage.currentUser;
					return;
				}
				return $q.reject(response);
			}
		};
	});