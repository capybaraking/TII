
'use strict';

angular
	.module('app')
	.controller('registerController', Controller);

function Controller($state, AuthenticationService) {
	var vm = this;

	vm.login = register;

	initController();

	function initController() {
        // reset login status
        AuthenticationService.Logout();
    };

    function register() {
    	


    };

    var password = document.getElementById("password"), password2 = document.getElementById("password2");

    function validatePassword(){
      if(password.value != password2.value) {
        password2.setCustomValidity("Les mots-de-passe que vous avez saisi ne sont pas sont identiques !");
      } else {
        password2.setCustomValidity('');
      }
    }

    password.onchange = validatePassword;
    password2.onkeydown = validatePassword;
}
