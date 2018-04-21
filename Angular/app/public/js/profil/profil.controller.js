'use strict'

angular.module("app")
	.controller("profilController",["$scope", "AuthenticationService", function profilController($scope, AuthenticationService){
		if(AuthenticationService.isConnected()){
			$scope.username = AuthenticationService.username();	
		}
		
	}]);