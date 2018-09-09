// import admin
angular.module('product').controller('productListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#categoryindex').removeClass("active");
  $('#businessindex').removeClass("active");
  $('#quatationindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#deliveryindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#expensetypeindex').removeClass("active");
  $('#expenseindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#invoicereportindex').removeClass("active");
  $('#receivedateindex').removeClass("active");
  $('#dailybalanceindex').removeClass("active");
  $('#accountindex').removeClass("active");
  $('#employeeindex').removeClass("active");
  $('#categoryindex').removeClass("active");
  $('#paymentdateindex').removeClass("active");
  $('#customerreportindex').removeClass("active");
  $('#quatationreportindex').removeClass("active");
  $('#expensereportindex').removeClass("active");
  $('#productindex').addClass("active");

  // $scope.productObj = JSON.parse(localStorage.getItem("productObj"));
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.productList = [];
    $scope.productListcount=0;
    $scope.loading1 = 0;
    $scope.limit={};
    $scope.parseInt = parseInt;
    $scope.viewList=[]; 

$scope.apiURL = $rootScope.baseURL+'/product/product/total';
   $scope.getAll = function () {
        if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }
      $http({
	      method: 'POST',
	      url: $scope.apiURL,
        data:$scope.limit,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(product)
	    {
	      product.forEach(function (value, key) {
                  $scope.productListcount=value.total;
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
        if ($scope.filterUser >= $scope.productListcount)
            $scope.filterUser = $scope.productListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/product/product/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(product)
              {
                $scope.filteredTodos = [];
                if (product.length > 0) {
                 
                  product.forEach(function (value, key) {
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

    $scope.deleteProduct = function (pm_id) {
      $scope.pm_id=pm_id;
    };

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/product/delete/'+$scope.pm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.productList = [];
                $scope.getAll();
      		  
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
          $('#del').text("Delete");
          $('#del').removeAttr('disabled'); 
	    });
	};

  $scope.recipeDetails = function(index){
      $('#recipeDetails').modal('show');

     
      // $scope.objList={
      // list:$scope.viewList[index]
      $scope.viewList=[];
      
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/product/recipe',
        data: $scope.filteredTodos[index],
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {
            
            $scope.viewList.push(value);
          });    
        // console.log($scope.viewList);
        // localStorage.setItem('productObj',JSON.stringify(product) )
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