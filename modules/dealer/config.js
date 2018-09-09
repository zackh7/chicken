'use strict';
/* Account Module */
angular.module('dealer', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/dealer',
                {
                    templateUrl: 'modules/dealer/partials/dealer-list.html',
                    controller: 'dealerListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dealer/controllers/dealer-list.js']
                            }]);
                        }]
                    }
                })

			.when('/dealer/add',
                {
                    templateUrl: 'modules/dealer/partials/dealer-add.html',
                    controller: 'dealerAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dealer/controllers/dealer-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/dealer/edit/:ctmId',
                {
                    templateUrl: 'modules/dealer/partials/dealer-edit.html',
                    controller: 'dealerEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dealer/controllers/dealer-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);