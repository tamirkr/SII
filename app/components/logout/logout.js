/**
 * Created by Tamir on 17/01/2017.
 */
'use strict';

LogoutController.$inject = ['authToken', '$state', 'currentIdentity']
function LogoutController(authToken, $state, currentIdentity) {
    authToken.removeToken();
    currentIdentity.removeUser();
    $state.go('login');
}

app.component('logout', {
    controller: LogoutController
})