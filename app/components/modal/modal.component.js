/**
 * Created by Tamir on 15/01/2017.
 */
'use strict';

ModalController.$inject = ['dataService', '$timeout']

function ModalController(dataService, SweetAlert) {
    var ctrl = this;
    ctrl.tripToEdit = {};

    ctrl.$onChanges = function (newData) {
        ctrl.tripToEdit = angular.copy(newData.data.currentValue)
    }


    ctrl.save = function () {
        dataService.update(ctrl.tripToEdit)
            .then(function (res) {
                if(res && res.config && res.config.data) {
                    angular.forEach(res.config.data, function (val, key) {
                        ctrl.data[key] = val;
                    })
                }
                SweetAlert.swal('Updated Successfully');
            })
            .catch(function (err) {
                console.error(err);
            })
    }

}

app.component('modal', {
    templateUrl: 'components/modal/modal.component.html',
    bindings: {
        data: '<'
    },
    controller: ModalController
})