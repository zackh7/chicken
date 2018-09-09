    'use strict';
/* Account Module */
angular.module('dinein', [])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            
            .when('/dinein',
                {
                    templateUrl: 'modules/dinein/partials/dinein-list.html',
                    controller: 'bookListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dinein/controllers/dinein-list.js']
                            }]);
                        }]
                    }
                })

            // .when('/dinein/add',
            //     {
            //         templateUrl: 'modules/dinein/partials/dinein-add.html',
            //         controller: 'dineinAddCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/dinein/controllers/dinein-add.js']
            //                 }]);
            //             }]
            //         }
            //     })
                
            // .when('/dinein/edit/:dineinId',
            //     {
            //         templateUrl: 'modules/dinein/partials/dinein-edit.html',
            //         controller: 'dineinEditCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/dinein/controllers/dinein-edit.js']
            //                 }]);
            //             }]
            //         }
            //     });
                
        }]);