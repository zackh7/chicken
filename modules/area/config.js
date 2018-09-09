'use strict';
/* Account Module */
angular.module('area', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/area',
                {
                    templateUrl: 'modules/area/partials/area-list.html',
                    controller: 'areaListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/area/controllers/area-list.js']
                            }]);
                        }]
                    }
                })

			.when('/area/add',
                {
                    templateUrl: 'modules/area/partials/area-add.html',
                    controller: 'areaAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/area/controllers/area-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/area/edit/:ctmId',
                {
                    templateUrl: 'modules/area/partials/area-edit.html',
                    controller: 'areaEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/area/controllers/area-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);