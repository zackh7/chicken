// import admin
angular.module('purcashbook').controller('purcashbookCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
  
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.purcashbookList = [];
    $scope.purcashbookListcount=0;
    $scope.limit={};
    $scope.loading1 = 0;
    
   $scope.getAll = function () {
        if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }
      $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/purcashbook/purcashbook/total',
        data: $scope.limit,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(expense)
	    {
	      expense.forEach(function (value, key) {
                  $scope.purcashbookListcount=value.total;
              });

              $scope.$watch("currentPage + numPerPage",
                  function () {
                    $scope.resetpagination();
                  });
              // $scope.$apply(); 
	    })
	    .error(function(data) 
	    {   
              $scope.loading1 = 1;
	      toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });          
	    });
    };

   //Pagination Function
    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.purcashbookListcount)
            $scope.filterUser = $scope.purcashbookListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/purcashbook/purcashbook/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(purcashbook)
              {
                $scope.filteredTodos = [];
                if (purcashbook.length > 0) {
                 
                  purcashbook.forEach(function (value, key) {
                      $scope.filteredTodos.push(value);
                  });
                }
                else{
                  
                }
                
                      // $scope.obj_Main = $scope.vendorList;
                      $scope.loading1 = 1;
                      // $scope.$apply(); 
              })
              .error(function(data) 
              {   
                  $scope.loading1 = 1;
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 3001);             
              });
    };
    //search Data
    $scope.getSearch = function () {
        $scope.getAll();
    };

    $scope.deletePurcashbook = function (pcm_id) {
      $scope.pcm_id=pcm_id;
    }  

    $scope.deleteConfirm = function () {
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/purcashbook/delete/'+$scope.pcm_id.pcm_id,
        data: $scope.pcm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $scope.purcashbookList = [];
                $scope.getAll();
                $('#confirm-delete').modal('hide');
	    })
	    .error(function(data) 
	    {   
	      toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });           
	    });
	};

});