/**
 * Created by Tamir on 13/01/2017.
 */
var app = angular.module('app', ['ui.router', 'oitozero.ngSweetAlert', 'ngMessages'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/home');

        var routeResolver = {
            getData: function (dataService, $timeout, $q, authToken, $state) {
                var token = authToken.getToken()

                return $timeout(function () {
                    if (!token) {
                        $state.go('login');
                        return $q.reject()
                    } else {
                        return dataService.getData()
                            .then(function (response) {
                                return response
                            })
                            .catch(function (err) {
                                return err
                            })
                    }
                });
            },
            getTripById: function (dataService, $stateParams) {
                return dataService.getDataById($stateParams.id)
                    .then(function (res) {
                        return res;
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            },
            userDetails: function () {
                var user = {
                    firstName: 'Tamir',
                    lastName: 'Kratz',
                    email: 'tamirkratz@gmail.com',
                    isAdmin: true
                }
                return user;
            },
            loggedIn: function (authToken, $state, $timeout, $q) {
                var token = authToken.getToken()

                return $timeout(function () {
                    if (!token) {
                        $state.go('login');
                        return $q.reject()
                    } else {
                        return $q.resolve();
                    }
                });

            }
        }

        $stateProvider
            .state('home', {
                url: '/home',
                template: '<home data="$resolve.data"></home>',
                resolve: {
                    // isLoggedIn: routeResolver.loggedIn,
                    data: routeResolver.getData
                }
            })
            .state('homeDetails', {
                url: '/home/:id',
                template: '<home-details data="$resolve.data"></home-details>',
                resolve: {
                    data: routeResolver.getTripById
                }
            })
            .state('about', {
                url: '/about',
                template: '<about user-details="$resolve.user"></about>',
                resolve: {
                    user: routeResolver.userDetails
                }
            })
            .state('login', {
                url: '/login',
                template: '<login></login>'
            })
            .state('register', {
                url: '/register',
                template: '<register></register>'
            })
            .state('logout', {
                template: '<logout></logout>'
            })

        $httpProvider.interceptors.push('authInterceptor')
    })
