'use strict';

authInterceptor.$inject = ['authToken'];

app.factory('authInterceptor', authInterceptor);

function authInterceptor(authToken) {
    return {
        request: function (config) {
            var token = authToken.getToken();
            if(token)
                config.headers.Authorization = 'bearer ' + token;
            return config;
        },
        response: function (response) {
            return response;
        }
    }
}