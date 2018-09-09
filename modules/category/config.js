'use strict';
/* Account Module */
angular.module('category', [])
    .config(['$routeProvider', function config($routeProvider) {
       

        $routeProvider
            
            .when('/category',
                {
                    templateUrl: 'modules/category/partials/category-list.html',
                    controller: 'categoryListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/category/controllers/category-list.js']
                            }]);
                        }]
                    }
                })

			.when('/category/add',
                {
                    templateUrl: 'modules/category/partials/category-add.html',
                    controller: 'categoryAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/category/controllers/category-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/category/edit/:ctmId',
                {
                    templateUrl: 'modules/category/partials/category-edit.html',
                    controller: 'categoryEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/category/controllers/category-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);