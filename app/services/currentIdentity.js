/**
 * Created by Tamir on 18/01/2017.
 */
'use strict';

currentIdentity.$inject = ['$window'];
app.service('currentIdentity', currentIdentity);

function currentIdentity($window) {
    var storage = $window.localStorage;
    
    function setUser(user) {
        console.log(user.email)
        storage.setItem('user', user.email);
    }
    
    function getUser() {
        var user = storage.getItem('user');
        return user;
    }
    
    function removeUser() {
        storage.removeItem('user')
    }
    
    return {
        setUser: setUser,
        getUser: getUser,
        removeUser: removeUser
    }
}