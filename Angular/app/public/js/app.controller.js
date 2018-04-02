'use strict';

// Application module
angular.module('app')
	.controller('ApplicationController', ['$scope', 'AuthenticationService', '$state', function($scope, AuthenticationService, $state){
		$scope.isConnected = AuthenticationService.isConnected;
		$scope.logout = function(){
			AuthenticationService.Logout();
			console.log("Bye bye");
			$state.go('home');
		}
	}])