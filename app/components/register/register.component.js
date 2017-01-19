/**
 * Created by Tamir on 17/01/2017.
 */

RegisterController.$inject = ['auth', 'SweetAlert'];


app.component('register', {
    templateUrl: 'components/register/register.component.html',
    controller: RegisterController
})

function RegisterController(auth, SweetAlert) {
    var ctrl = this;
    ctrl.submit = function () {
        auth.register(ctrl.email, ctrl.password)
            .then(function (res) {
                SweetAlert.success("Account created! Welcome,", res.email);
            })
            .catch(function (err) {
                SweetAlert.error("Something went wrong," , err.data.message);
            })
    }


}