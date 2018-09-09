'use strict';
/* Account Module */
angular.module('table', [])
    .config(['$routeProvider', function config($routeProvider) {
        
        $routeProvider
            
            .when('/table',
                {
                    templateUrl: 'modules/table/partials/table-list.html',
                    controller: 'tableListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/table/controllers/table-list.js']
                            }]);
                        }]
                    }
                })

			.when('/table/add',
                {
                    templateUrl: 'modules/table/partials/table-add.html',
                    controller: 'tableAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/table/controllers/table-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/table/edit/:ctmId',
                {
                    templateUrl: 'modules/table/partials/table-edit.html',
                    controller: 'tableEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/table/controllers/table-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);