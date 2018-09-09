// import admin
angular.module('purchase').controller('purchaseListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#paymentdateindex').removeClass("active");
  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#categoryindex').removeClass("active");
  $('#productindex').removeClass("active");
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
  $('#customerreportindex').removeClass("active");
  $('#quatationreportindex').removeClass("active");
  $('#expensereportindex').removeClass("active");
  $('#categoryindex').addClass("active");
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.purchaseList = [];
    $scope.purchaseListcount=0;
    $scope.limit={};
    $scope.loading1 = 0;
    $scope.parseFloat = parseFloat;

   $scope.getAll = function () {
        if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }
      $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/purchase/purchase/total',
        data:$scope.limit,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(purchase)
	    {
	      purchase.forEach(function (value, key) {
                  $scope.purchaseListcount=value.total;
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
        if ($scope.filterUser >= $scope.purchaseListcount)
            $scope.filterUser = $scope.purchaseListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/purchase/purchase/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(purchase)
              {
                $scope.filteredTodos = [];
                if (purchase.length > 0) {
                 
                  purchase.forEach(function (value, key) {
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

    $scope.deletePurchase = function (prm_id) {
      $scope.prm_id=prm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
              $('#del').text("please wait...");
	     $http({
	      method: 'POST',
        url: $rootScope.baseURL+'/purchase/delete/'+$scope.prm_id.prm_id,
        data: $scope.prm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Cancelled");
                $('#del').removeAttr('disabled');
                $scope.purchaseList = [];
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
          $('#del').text("Cancelled");
          $('#del').removeAttr('disabled');
	    });
	};

  $scope.viewPurchaseDetails = function (index) {
    
    $scope.purchaseProductList = [];
      $scope.invoiceno = $scope.filteredTodos[index].prm_invoice_no;
      $scope.dmfirmname = $scope.filteredTodos[index].dm_firm_name;
      $scope.dmaddress = $scope.filteredTodos[index].dm_address;
      $scope.dmnumber = $scope.filteredTodos[index].dm_number;
      $scope.prmamount = $filter('number')($scope.filteredTodos[index].prm_amount, "2");
      $scope.prmdate = $filter('date')($scope.filteredTodos[index].prm_date, "mediumDate");
      $scope.prmpaymentdate = $filter('date')($scope.filteredTodos[index].prm_payment_date, "mediumDate");
      $scope.prmcredit = $scope.filteredTodos[index].prm_credit;
      $scope.prmcomment = $scope.filteredTodos[index].prm_comment;
      $scope.prmstatus = $scope.filteredTodos[index].prm_status;
      // $scope.convertNumberToWords($scope.prmamount);

      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/purchase/details/'+$scope.filteredTodos[index].prm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(purchaseProductList)
      {
        var i = 1;
        purchaseProductList.forEach(function (value, key) {
              value.srno = i++;
              $scope.purchaseProductList.push(value);
            });
        // $scope.purchaseProductList = angular.copy(purchaseProductList);
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