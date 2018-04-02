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

    return service;

    function Login(username, password, callback) {
        $http.post('http://localhost:3000/auth/login', {email: username, password: password})
        .then(function success(response) {
            // login successful if there's a token in the response
            if (response.data.access_token) {
                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = { username: username, token: response.data.access_token };

                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

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