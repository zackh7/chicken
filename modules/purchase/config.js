'use strict';
/* Account Module */
angular.module('purchase', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/purchase',
                {
                    templateUrl: 'modules/purchase/partials/purchase-list.html',
                    controller: 'purchaseListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purchase/controllers/purchase-list.js']
                            }]);
                        }]
                    }
                })

			.when('/purchase/add',
                {
                    templateUrl: 'modules/purchase/partials/purchase-add.html',
                    controller: 'purchaseAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purchase/controllers/purchase-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/purchase/edit/:ctmId',
                {
                    templateUrl: 'modules/purchase/partials/purchase-edit.html',
                    controller: 'purchaseEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purchase/controllers/purchase-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);