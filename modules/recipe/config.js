'use strict';
/* Account Module */
angular.module('recipe', [])
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
            
            .when('/recipe',
                {
                    templateUrl: 'modules/recipe/partials/recipe-list.html',
                    controller: 'recipeListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/recipe/controllers/recipe-list.js']
                            }]);
                        }]
                    }
                })

			.when('/recipe/add',
                {
                    templateUrl: 'modules/recipe/partials/recipe-add.html',
                    controller: 'recipeAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/recipe/controllers/recipe-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/recipe/edit/:ctmId',
                {
                    templateUrl: 'modules/recipe/partials/recipe-edit.html',
                    controller: 'recipeEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/recipe/controllers/recipe-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);