'use strict';
/* Account Module */
angular.module('kitchen', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/kitchen/pending',
                {
                    templateUrl: 'modules/kitchen/partials/pending-list.html',
                    controller: 'pendingListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/kitchen/controllers/pending-list.js']
                            }]);
                        }]
                    }
                })

			.when('/kitchen/completed',
                {
                    templateUrl: 'modules/kitchen/partials/completed-list.html',
                    controller: 'completedListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/kitchen/controllers/completed-list.js']
                            }]);
                        }]
                    }
                })
				
			// .when('/kitchen/edit/:kitchenId',
   //              {
   //                  templateUrl: 'modules/kitchen/partials/kitchen-edit.html',
   //                  controller: 'kitchenEditCtrl',
   //                  resolve: {
   //                      lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
   //                          return $ocLazyLoad.load([{
   //                              name: 'myApp',
   //                              files: ['modules/kitchen/controllers/kitchen-edit.js']
   //                          }]);
   //                      }]
   //                  }
   //              });
				
        }]);