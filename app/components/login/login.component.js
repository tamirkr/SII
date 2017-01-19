/**
 * Created by Tamir on 17/01/2017.
 */
'use strict';

function LoginController(auth, SweetAlert) {
    var ctrl = this;
    ctrl.submit = function () {
        auth.login(ctrl.email, ctrl.password)
            .then(function (res) {
                SweetAlert.success("Welcome,", res.email);
            })
            .catch(function (err) {
                SweetAlert.error("Something went wrong, ",  err.data.message);
            })
    }
}

app.component('login', {
    templateUrl: 'components/login/login.component.html',
    controller: LoginController
})