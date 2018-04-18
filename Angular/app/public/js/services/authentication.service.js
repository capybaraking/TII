'use strict';

angular
.module('app')
.factory('AuthenticationService', Service);

function Service($http, $localStorage, jwtHelper) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.isConnected = function(){
        if($localStorage.currentUser){
            return !jwtHelper.isTokenExpired($localStorage.currentUser.token);
        }else{
            return false;
        }

    }
    service.userName = function(){
    return $localStorage.currentUser.username ; 
}

return service;

    /*
    Cette fonction est appelée quand on se connecte depuis le site. Elle demande à l'API un token d'utilisation,
    et elle le stocke chez le client (dans le localStorage) ainsi que son nom d'utilisateur.P
    */
    function Login(username, password, callback) {
        $http.post('http://localhost:3000/auth/login', {pseudo: username, password: password})
        .then(function success(response) {
            // login successful if there's a token in the response
            if (response.data.access_token) {
                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = { username: username, token: response.data.access_token };

                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;

                // execute callback with true to indicate successful login
                callback(true);
            } else {
                // execute callback with false to indicate failed login
                callback(false);
            }
        },
        function error(response){
            callback(false)
        });
    }

    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }
}