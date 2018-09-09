'use strict';
/* Account Module */
angular.module('subcategory', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {
              /*  if (!localStorageService.get('kayre_access_token')) {
                    alert("Your session has been expired");
                    window.location = 'login.html';
                    return $q.defer.promise;
                }*/

            }]

        };

        $routeProvider
            
            .when('/subcategory',
                {
                    templateUrl: 'modules/subcategory/partials/subcategory-list.html',
                    controller: 'subcategoryListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/subcategory/controllers/subcategory-list.js']
                            }]);
                        }]
                    }
                })

			.when('/subcategory/add',
                {
                    templateUrl: 'modules/subcategory/partials/subcategory-add.html',
                    controller: 'subcategoryAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/subcategory/controllers/subcategory-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/subcategory/edit/:ctmId',
                {
                    templateUrl: 'modules/subcategory/partials/subcategory-edit.html',
                    controller: 'subcategoryEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/subcategory/controllers/subcategory-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);