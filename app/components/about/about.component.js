/**
 * Created by Tamir on 16/01/2017.
 */


function AboutController() {
    var ctrl = this;
    // ctrl.$onInit = function () {
    //     ctrl.user = {
    //         firstName: 'Tamir',
    //         lastName: 'Kratz',
    //         email: 'tamirkratz@gmail.com',
    //         isAdmin: true
    //     }
    //     console.log(ctrl.user);
    // }
    //
    // ctrl.print = function () {
    //     console.log(ctrl.user)
    // }

}

app.component('about', {
    templateUrl: 'components/about/about.component.html',
    bindings: {
        userDetails: '='
    },
    controller: AboutController
})