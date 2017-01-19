/**
 * Created by Tamir on 17/01/2017.
 */
'use strict';

auth.$inject = ['$http','$q', '$state', 'authToken', 'currentIdentity']

app.service('auth',auth);

function auth($http, $q, $state, authToken, currentIdentity) {
    function login(email, password) {
        return $http.post('/login', {email: email, password: password})
            .then(authSuccessful)
    }
    
    function register(email, password) {
        return $http.post('/register', {email: email, password: password})
            .then(authSuccessful)
    }
    
    function authSuccessful(res) {
        var dfd = $q.defer();
        authToken.setToken(res.data.token);
        currentIdentity.setUser(res.data.user);
        $state.go('home');
        dfd.resolve(res.data.user)
        return dfd.promise;
    }
    
    return {
        login: login,
        register: register
    }
}