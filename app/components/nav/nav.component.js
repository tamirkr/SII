/**
 * Created by Tamir on 13/01/2017.
 */
'use strict';

function TopNavController(currentIdentity) {
    var ctrl = this;
    ctrl.email = currentIdentity.getUser();
}

app.component('topNav', {
    templateUrl: 'components/nav/nav.component.html',
    bindings: {
        currentUser: '='
    },
    controller: TopNavController
});