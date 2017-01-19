/**
 * Created by Tamir on 19/01/2017.
 */
'use strict';
GridController.$inject = ['currentIdentity']

function GridController(currentIdentity) {
    var ctrl = this;
    this.email = currentIdentity.getUser()
}

app.component('grid', {
    templateUrl: 'components/grid/grid.component.html',
    controller: GridController
})