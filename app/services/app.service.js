/**
 * Created by Tamir on 13/01/2017.
 */
'use strict';

dataService.$inject = ['$q', '$http']

app.service('dataService', dataService)

function dataService($q, $http) {

    function getData() {
        var dfd = $q.defer();
        $http.get('/api/data')
            .then(function (data) {
                dfd.resolve(data.data)
            })
            .catch(function (data, status) {
                dfd.reject(status)
            })
        return dfd.promise;
    }

    function getDataById(id) {
        var dfd = $q.defer();
        $http.get('/api/data/' + id)
            .then(function (data,status) {
                dfd.resolve(data.data);
            })
            .catch(function (data, status) {
                dfd.reject(status);
            })
        
        return dfd.promise;
    }

    function update(newTrip) {
        var dfd = $q.defer();
        $http.put('/api/data/' + newTrip.id, newTrip)
            .then(function (data) {
                dfd.resolve(data);
            })
            .catch(function (data, status) {
                dfd.reject(status);
            })
        return dfd.promise;
    }

    return {
        getData: getData,
        getDataById: getDataById,
        update: update
    }
}