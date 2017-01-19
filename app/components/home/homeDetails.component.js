/**
 * Created by Tamir on 13/01/2017.
 */
'use strict';


function HomeDetailsController() {
    var ctrl = this;
    
    ctrl.edit = function (trip) {
        ctrl.clickedTrip = trip;
    }



}

app.component('homeDetails', {
    templateUrl: 'components/home/homeDetails.component.html',
    controller: HomeDetailsController,
    bindings: {
        data: '='
    }
})