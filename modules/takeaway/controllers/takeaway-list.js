 // import admin
 angular.module('takeaway').controller('takeawayAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.pro=0;
    $scope.tab=0;
    $scope.categoryList = [];
    $scope.productList = [];
    $scope.tableList = [];
    $scope.itemList = [];
    $scope.om_add=0;
    $scope.orderObj = {};
    $scope.orderObj.om_total=0;
    $scope.printList=[];

    $scope.orderObj.om_where='takeaway';

    // console.log($scope.tableObj);
// localStorage.setItem("tableObj");
// localStorage["tablesList"]=JSON.stringify($scope.tableObj);


  $scope.getAll = function () {
        
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/category',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
          category.forEach(function (value, key) {
            $scope.categoryList.push(value);
          });
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

  $scope.getPrintDetails = function () {
      $scope.printList = [];
      $scope.orderObj.total_amount = 0;  
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/ongoing/orders',
        data: $scope.orderObj,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {
          value.opm_quantity_old = value.opm_quantity;
          $scope.orderObj.total_amount = parseFloat(parseFloat($scope.orderObj.total_amount) + parseFloat(value.opm_total));
          $scope.printList.push(value);
          });
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


    $scope.getPro=function(product){
      $scope.productList=[];

      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/product/items',
        data: product,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
      $('#stop').attr("disabled","true");
        category.forEach(function (value, key) {
          value.quantity = 1;
          $scope.productList.push(value);
        });
        $scope.pro=1;
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

    $scope.addOrder = function (product){
        $scope.itemList=[];
         var flag = 0;
      
      $('#stop').removeAttr("disabled");
        if ($scope.itemList.length == 0) 
        {
          $scope.itemList.push(product);
          product.total = product.pm_rate * product.quantity;
          $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + product.pm_rate);
        }
        else{
          $scope.itemList.forEach(function (value, key) {
            if (value.pm_id == product.pm_id) 
              {
                value.quantity++;
                value.total = value.pm_rate * value.quantity;
                $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + value.pm_rate);;
                flag=1;
              }
          });
            if (flag==0)
              {
                product.total = product.pm_rate * product.quantity;
                $scope.orderObj.om_total =  parseFloat($scope.orderObj.om_total + product.pm_rate);
                $scope.itemList.push(product);
              }
        }
      };

    $scope.om_min = function (index){
        if($scope.itemList[index].quantity == 1){
          $scope.itemList[index].total = $scope.itemList[index].pm_rate * $scope.itemList[index].quantity;
          $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total - $scope.itemList[index].pm_rate);
          $scope.itemList.splice(index, 1);
        }
        else
        {
          $scope.itemList[index].quantity--;
          $scope.itemList[index].total = $scope.itemList[index].pm_rate * $scope.itemList[index].quantity;
          $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total - $scope.itemList[index].pm_rate);
          // $scope.itemList = value.pm_rate * value.quantity;
        }
      };


    $scope.orderConfirm = function(){
     

      $scope.objList={
        list:$scope.itemList, 
        obj:$scope.orderObj
      };
      
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/takeaway/delivery',
        data: $scope.objList,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        toastr.success('Order Placed', 'Success', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });          
        $rootScope.socket.emit('takeaway',{
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
});