 // import admin
angular.module('kitchen').controller('pendingListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.kitchenList = [];
    $scope.productListcount=0;
    $scope.loading1 = 0;
    $scope.limit={};
    $scope.parseInt = parseInt;

   $scope.getAll = function () {
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/kitchen/pending',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {
        $scope.kitchenList.push(value);
        });
        $scope.loading1 = 1;
        /*$rootScope.socket.emit('orderPlace',{
            obj:category[0]
          });*/
        
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
   
   $scope.ordercomplete = function (index) {
    
    $http({
        method: 'POST',
        url: $rootScope.baseURL+'/kitchen/order/update',
        data: $scope.kitchenList[index],
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        toastr.success('Order Completed', 'Success', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });
          $rootScope.socket.emit('order-update',{
            obj:category[0]
          });
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
       $rootScope.socket.on('order-update', function(data){
        $route.reload();
       });
       $rootScope.socket.on('orderPlace', function(data){
        $route.reload();
       });
       $rootScope.socket.on('takeaway', function(data){
        $route.reload();
       });
    
});