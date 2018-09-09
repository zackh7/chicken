// import admin
angular.module('dealer').controller('dealerListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

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
    $scope.dealerList = [];
    $scope.dealerListcount=0;
    $scope.limit={};
    $scope.loading1 = 0;
$scope.apiURL = $rootScope.baseURL+'/dealer/dealer/total';
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
	    .success(function(category)
	    {
	      category.forEach(function (value, key) {
                  $scope.dealerListcount=value.total;
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
        if ($scope.filterUser >= $scope.dealerListcount)
            $scope.filterUser = $scope.dealerListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/dealer/dealer/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(dealer)
              {
                $scope.filteredTodos = [];
                if (dealer.length > 0) {
                 
                  dealer.forEach(function (value, key) {
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

    $scope.deleteDealer = function (dm_id) {
      $scope.dm_id=dm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
              $('#del').text("please wait...");
	     $http({
	      method: 'POST',
        url: $rootScope.baseURL+'/dealer/delete/'+$scope.dm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.dealerList = [];
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
          $('#del').text("Delete");
          $('#del').removeAttr('disabled');
	    });
	};

  $scope.dealerDetails = function (index) {
      $scope.dname = $scope.filteredTodos[index].dm_firm_name;
      $scope.dno = $scope.filteredTodos[index].dm_number;
      $scope.dadd = $scope.filteredTodos[index].dm_address;
      $scope.dcredit = $scope.filteredTodos[index].dm_credit;
      $scope.ddebit = $scope.filteredTodos[index].dm_debit;
      $scope.dopeningcredit = $scope.filteredTodos[index].dm_opening_credit;
      $scope.dopeningdebit = $scope.filteredTodos[index].dm_opening_debit;

      $scope.dealerdetailsList =[];
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/dealer/details/'+$scope.filteredTodos[index].dm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(dealerdetailsList)
      {
        // $scope.dealerdetailsList = angular.copy(dealerdetailsList);
        var amount_balance = 0;
        if($scope.dopeningcredit !=0){
          amount_balance = parseInt(amount_balance) + $scope.dopeningcredit;
          $scope.dealerdetailsList = [{"credit":$scope.dopeningcredit , "debit":$scope.dopeningdebit , "drcr":"CR", "bal":amount_balance , "date":"" , "invoice":"" , "status":"Opening Balance" , "type":"Opening"}];
        }
        else if($scope.dopeningdebit !=0){
          amount_balance = parseInt(amount_balance) - $scope.dopeningdebit;
          $scope.dealerdetailsList = [{"credit":$scope.dopeningcredit , "debit":$scope.dopeningdebit , "drcr":"DR", "bal": Math.abs(amount_balance) , "date":"" , "invoice":"" , "status":"Opening Balance" , "type":"Opening"}];
        }

          dealerdetailsList.forEach(function (value, key) {

            $scope.data = new Date(value.date);
            if(value.credit == 0)
            {
              amount_balance = parseInt(amount_balance) - parseInt(value.debit);
            }
            else if(value.debit == 0)
            {
              amount_balance = parseInt(amount_balance) + parseInt(value.credit);
            }
            if(amount_balance < 0)
            {
              Math.abs(amount_balance);
            value.bal = Math.abs(amount_balance);
              value.drcr="DR";
            }
            else{
              value.drcr="CR";
              value.bal = amount_balance;
            }
            if($scope.fDate <= $scope.data && $scope.tDate >= $scope.data)
            {
              $scope.dealerdetailsList.push(value);
            }
            else if($('#user-datepicker-from').val() == "" && $('#user-datepicker-to').val() == "")  
            {
              $scope.dealerdetailsList.push(value);
            }
          });
          // $('#filter-user-btn').text("Filter");
          // $('#filter-user-btn').removeAttr('disabled');
          // $('#reset-user-btn').text("Reset");
          // $('#reset-user-btn').removeAttr('disabled');
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