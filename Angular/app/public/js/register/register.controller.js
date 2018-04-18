"use strict";
angular.module('app')
.controller('registerController', ['$scope', 'inscription', function appController ($scope, inscription) {
    $scope.username = ""; 
    $scope.email = "";
    $scope.password1 = "";
    $scope.password2 = "";

    $scope.succes = false;
    $scope.erreur = ''; 

    var password = document.getElementById("password"), password2 = document.getElementById("password2");

    function validatePassword(){
      if(password.value == password2.value) {
        password2.setCustomValidity('');
      } else {
        password2.setCustomValidity("Les mots-de-passe que vous avez saisi ne sont pas sont identiques !");
        
      }
    }

    password.onchange = validatePassword;
    password2.onkeydown = validatePassword;

    $scope.reset = function(){
        $scope.username = ""; 
        $scope.email = ""; 
        $scope.password1 = "";
        $scope.password2 = "";
    }

    $scope.submit = function(){
        console.log("Hello");
        inscription.createAccount($scope.username, $scope.email,$scope.password1).then(function(){
            $scope.succes = true;
            console.log("Compte créé");
            $scope.reset();
        }).catch(function(erreur){
            $scope.erreur = erreur;
            console.log(erreur);
        });
    }
}]);
