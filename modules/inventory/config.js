'use strict';
/* Account Module */
angular.module('inventory', [])
    .config(['$routeProvider', function config($routeProvider) {
        
        $routeProvider
            
            .when('/inventory',
                {
                    templateUrl: 'modules/inventory/partials/inventory-list.html',
                    controller: 'inventoryListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/inventory/controllers/inventory-list.js']
                            }]);
                        }]
                    }
                })

			.when('/inventory/add',
                {
                    templateUrl: 'modules/inventory/partials/inventory-add.html',
                    controller: 'inventoryAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/inventory/controllers/inventory-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/inventory/edit/:ctmId',
                {
                    templateUrl: 'modules/inventory/partials/inventory-edit.html',
                    controller: 'inventoryEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/inventory/controllers/inventory-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);