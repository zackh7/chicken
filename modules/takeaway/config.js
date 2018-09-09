'use strict';
/* Account Module */
angular.module('takeaway', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/takeaway',
                {
                    templateUrl: 'modules/takeaway/partials/takeaway-list.html',
                    controller: 'takeawayAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/takeaway/controllers/takeaway-list.js']
                            }]);
                        }]
                    }
                })

            // .when('/order/add',
            //     {
            //         templateUrl: 'modules/order/partials/order-add.html',
            //         controller: 'orderAddCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/order/controllers/order-add.js']
            //                 }]);
            //             }]
            //         }
            //     })
                
            // .when('/order/edit/:ctmId',
            //     {
            //         templateUrl: 'modules/order/partials/order-edit.html',
            //         controller: 'orderEditCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/order/controllers/order-edit.js']
            //                 }]);
            //             }]
            //         }
            //     });
                
        }]);