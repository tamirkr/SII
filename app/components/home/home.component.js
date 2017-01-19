/**
 * Created by Tamir on 13/01/2017.
 */
'use strict';
HomeController.$inject = ['SweetAlert', '$state']

function HomeController(SweetAlert, $state) {
    var ctrl = this;
    ctrl.sortType = 'operator';
    ctrl.sortReverse = false;
    ctrl.searchTrip = '';
    
    ctrl.delete = function(trip) {
        SweetAlert.swal({
                title: "Are you sure?", //Bold text
                text: "Your will not be able to recover this trip!", //light text
                type: "warning", //type -- adds appropiriate icon
                showCancelButton: true, // displays cancel btton
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) { //Function that triggers on user action.
                if (isConfirm) {
                    var idx = ctrl.data.indexOf(trip)
                    if (idx >= 0)
                        ctrl.data.splice(idx, 1)
                    SweetAlert.swal("Deleted!", "Your trip has been deleted.", "success");
                } else {
                    SweetAlert.swal("Cancelled", "Your trip is safe :)", "error");
                }
            });
    }    
}

app.component('home', {
    templateUrl: 'components/home/home.component.html',
    bindings: {
      data: '='  
    },
    controller: HomeController
})