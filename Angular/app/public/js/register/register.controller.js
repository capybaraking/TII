"use strict";
angular.module('app')
.controller('registerController', ['$scope', 'inscription', function appController ($scope, inscription) {
    $scope.username = ""; 
    $scope.email = "";
    $scope.password1 = "";
    $scope.password2 = "";

    $scope.succes = false;
    $scope.erreur = ''; 


    function validatePassword(){
      if( $scope.password == $scope.password2) {
        $scope.password2.setCustomValidity('');
      } else {
        $scope.password2.setCustomValidity("Les mots-de-passe que vous avez saisi ne sont pas sont identiques !");
        
      }


        $scope.password.onchange = validatePassword;
        $scope.password2.onchange = validatePassword;
    }


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
