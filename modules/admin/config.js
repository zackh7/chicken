'use strict';

/* Account Module */
angular.module('admin', [])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/',
                {
                    templateUrl: 'modules/admin/partials/dashboard.html',
                    controller: 'dashboardCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/admin/controllers/dashboard.js']
                            }]);
                        }]
                    }
                })
            .when('/settings',
                {
                    templateUrl: 'modules/admin/partials/change-pass.html',
                    controller: 'changePasswordCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/admin/controllers/change-password.js']
                            }]);
                        }]
                    }
                })
            .when('/profile',
                {
                    templateUrl: 'modules/admin/partials/change-image.html',
                    controller: 'changeImageCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/admin/controllers/change-image.js']
                            }]);
                        }]
                    }
                });

    }]);