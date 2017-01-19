'use strict';

authToken.$inject = ['$window'];

app.factory('authToken',authToken);

function authToken($window) {
    var storage = $window.localStorage;
    var cachedToken;
    
    var authToken = {
        setToken: function (token) {
            cachedToken = token;
            storage.setItem('userToken', cachedToken)
        },
        getToken: function () {
            if(!cachedToken)
                return storage.getItem('userToken')
            return cachedToken;
        },
        removeToken: function () {
            cachedToken = null;
            storage.removeItem('userToken');
        }
    }
    
    return authToken;
}