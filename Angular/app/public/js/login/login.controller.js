
'use strict';

angular
	.module('app')
	.controller('loginController', Controller);

function Controller($state, AuthenticationService) {
	var vm = this;

	vm.login = login;

	initController();

	function initController() {
        // reset login status
        AuthenticationService.Logout();
    };

    function login() {
    	vm.loading = true;
    	AuthenticationService.Login(vm.username, vm.password, function (result) {
    		if (result === true) {
    			$state.go('home');
    		} else {
    			vm.error = 'Username or password is incorrect';
    			vm.loading = false;
    		}
    	});
    };
}
