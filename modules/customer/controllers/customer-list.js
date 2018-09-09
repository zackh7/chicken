// import admin
angular.module('customer').controller('customerListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#dashboardindex').removeClass("active");
  $('#vendorindex').removeClass("active");
  $('#employeeindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#moneyindex').removeClass("active");
  $('#purchaseindex').removeClass("active");
  $('#purchasereturnindex').removeClass("active");
  $('#inrindex').removeClass("active");
  $('#saleindex').removeClass("active");
  $('#salereturnindex').removeClass("active");
  $('#bookindex').removeClass("active");
  $('#expenseindex').removeClass("active");
  $('#purexpenseindex').removeClass("active");
  $('#expensetypeindex').removeClass("active");
  $('#dailyexpenseindex').removeClass("active");
  $('#filesindex').removeClass("active");
  $('#salereportindex').removeClass("active");
  $('#purchasereportindex').removeClass("active");
  $('#paymentdatereportindex').removeClass("active");
  $('#chequereceivedateindex').removeClass("active");
  $('#chequepaymentdateindex').removeClass("active");
  $('#balancesheetreportindex').removeClass("active");
  $('#customerreportindex').removeClass("active");
  $('#vendorreportindex').removeClass("active");
  $('#productsalecountindex').removeClass("active");
  $('#newvendorindex').removeClass("active");
  $('#newcustomerindex').removeClass("active");
  $('#newemployeeindex').removeClass("active");
  $('#newpurchaseindex').removeClass("active");
  $('#newpurchasereturnindex').removeClass("active");
  $('#newsaleindex').removeClass("active");
  $('#newsalereturnindex').removeClass("active");
  $('#newexpenseindex').removeClass("active");
  $('#newpurexpenseindex').removeClass("active");
  $('#newproductindex').removeClass("active");
  $('#usersindex').addClass("active");
  $('#customerindex').addClass("active");

    $('#addrecord').hide();
    $('#checkrecord').hide();
    $('#printTable').hide();
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.customerList = [];
    $scope.customerListcount=0;
    $scope.limit = {};
    $scope.loading1 = 0;


$scope.apiURL = $rootScope.baseURL+'/customer/customer/total';
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
                  $scope.customerListcount=value.total;
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

   

    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.customerListcount)
            $scope.filterUser = $scope.customerListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/customer/customer/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(customer)
              {
                $scope.filteredTodos = [];
                if (customer.length > 0) {
                 
                  customer.forEach(function (value, key) {
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

    $scope.deleteCustomer = function (cm_id) {
      $scope.cm_id=cm_id;
    }  

    $rootScope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/customer/delete/'+$scope.cm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.customerList=[];
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

  /*$scope.viewCustomerDetails1 = function (index) {
      $scope.ind = index;
    $('#user-datepicker-from').val("");
    $('#user-datepicker-to').val("");
    $scope.viewCustomerDetails(index);
  };*/

  /*$scope.viewCustomerDetails = function (index) {
      $scope.venname = $scope.filteredTodos[index].cm_name;
      $scope.venno = $scope.filteredTodos[index].cm_mobile;
      $scope.venemail = $scope.filteredTodos[index].cm_email;
      $scope.venadd = $scope.filteredTodos[index].cm_address +" "+$scope.filteredTodos[index].cm_state+" "+$scope.filteredTodos[index].cm_city+" "+$scope.filteredTodos[index].cm_pin;
      $scope.vendeladd = $scope.filteredTodos[index].cm_del_address +" "+$scope.filteredTodos[index].cm_del_state+" "+$scope.filteredTodos[index].cm_del_city+" "+$scope.filteredTodos[index].cm_del_pin;
      $scope.venbal = $scope.filteredTodos[index].cm_balance;
      $scope.vendebit = $scope.filteredTodos[index].cm_debit;
      $scope.vencode = $scope.filteredTodos[index].cm_code;
      $scope.cmgstno = $scope.filteredTodos[index].cm_gst_no;
      $scope.copeningcredit = $scope.filteredTodos[index].cm_opening_credit;
      $scope.copeningdebit = $scope.filteredTodos[index].cm_opening_debit;

      $scope.customerList =[];
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/customer/details/'+$scope.filteredTodos[index].cm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(customerList)
      {
        // $scope.customerListcount = angular.copy(customerListcount);
        var amount_balance = 0;

        if($scope.copeningcredit !=0){
          amount_balance = parseInt(amount_balance) + $scope.copeningcredit;
          $scope.customerList = [{"credit":$scope.copeningcredit , "debit":$scope.copeningdebit , "drcr":"CR", "bal":amount_balance , "date":"" , "invoice":"" , "status":"Opening Balance" , "type":"Opening"}];
        }
        else if($scope.copeningdebit !=0){
          amount_balance = parseInt(amount_balance) - $scope.copeningdebit;
          $scope.customerList = [{"credit":$scope.copeningcredit , "debit":$scope.copeningdebit , "drcr":"DR", "bal": Math.abs(amount_balance) , "date":"" , "invoice":"" , "status":"Opening Balance" , "type":"Opening"}];
        }
        
          customerList.forEach(function (value, key) {
            $scope.data = new Date(value.date);
            $scope.data.setHours(0,0,0,0);
            if(value.credit == 0 && value.ctype == 'Credit')
            {
              amount_balance = parseInt(amount_balance) - parseInt(value.debit);
            }
            else if(value.credit == 0 && value.type == 'Cashbook')
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
              $scope.customerList.push(value);
            }
            else if($('#user-datepicker-from').val() == "" && $('#user-datepicker-to').val() == "")  
            {
              $scope.customerList.push(value);
            }
          });
        
          $('#filter-user-btn').text("Filter");
          $('#filter-user-btn').removeAttr('disabled');
          $('#reset-user-btn').text("Reset");
          $('#reset-user-btn').removeAttr('disabled');
      })
      .error(function(data) 
      {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      });

    };*/

    $scope.printDetails = function(){
      var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
          var printchar = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/vendor/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "   <style type='text/css' media='print'>" +
            "  @page " +
             " {" +
              "    size:  A4 portrait;" +  /* auto is the initial value */
               "   margin: 0; " + /* this affects the margin in the printer settings */
              "}" +

              "html" +
              "{" +
               "   background-color: #FFFFFF;" + 
                "  margin: 0px; " + /* this affects the margin on the html before sending to printer */
              "}" +

              "body" +
              "{" +
                "font-size:11pt;"+
                "font-family:'Open Sans', sans-serif;"+
               // "   border: solid 1px black ;" +
                "  margin: 5mm 5mm 5mm 5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()'>" +
            "<center style='font-size:11pt;'>Customer Ledger</center>"+
           "<table width='100%' height='95%'>" +
            "<thead>"+
              "<tr>"+
                "<td style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                      
                      "<td colspan='2' style='text-align:center; padding-bottom: 20; border-style: none none solid none; border-width:1px; font-size:11pt;' valign='center' width='100%'>" +
                          "<h3 style='font-size:14pt;margin-bottom: 0;'>"+localStorage.getItem("com_name")+"</h3><br>" +
                          "Address : "+localStorage.getItem("com_address")+" "+localStorage.getItem("com_state")+" "+localStorage.getItem("com_city")+" "+localStorage.getItem("com_pin")+"<br>" +
                          "Phone : "+localStorage.getItem("com_contact")+"<br>"+
                          "E-Mail : "+localStorage.getItem("com_email")+"<br>"+
                          "GST No.: "+localStorage.getItem("com_gst")+"<br>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: none solid solid none; border-width:1px;'>Customer Name : <strong>"+$scope.venname+"</strong></td>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: none none solid none; border-width:1px;'>Contact Number : <strong>"+$scope.venno+"</strong></td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='50%' rowspan='2' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: none solid solid none; border-width:1px;'>Address : <strong>"+$scope.venadd+"</strong></td>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: none none solid none; border-width:1px;'>Customer E-Mail : <strong>"+$scope.venemail+"</strong></td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: none none solid none; border-width:1px;'>GST : <strong>"+$scope.cmgstno+"</strong></td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='50%' rowspan='2' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: none solid none none; border-width:1px;'>Delivery Address : <strong>"+$scope.vendeladd+"</strong></td>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: none none solid none; border-width:1px;'>Debit : <strong>"+$scope.vendebit+"</strong></td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt;'>Credit : <strong>"+$scope.venbal+"</strong></td>" +
                    "</tr>" ;
                    if($('#user-datepicker-from').val() != "" && $('#user-datepicker-to').val() != "") 
                    {
                    printchar = printchar + "<tr>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: solid solid none none; border-width:1px;'>From Date : <strong>"+$filter('date')($scope.fDate, "mediumDate")+"</strong></td>" +
                      "<td width='50%' style='padding:4px 8px 4px 8px; font-size:11pt; border-style: solid none none none; border-width:1px;'>To Date : <strong>"+$filter('date')($scope.tDate, "mediumDate")+"</strong></td>" +
                    "</tr>" ;
                    }
                  printchar = printchar + "</table>"+
                "</td>"+
              "</tr>"+
            "</thead>"+
            "<tbody>"+
              "<tr>"+
                "<td valign='top' style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+      
                        "<th style='padding:4px 8px 4px 8px; font-size:11pt;'>Type</th>" +
                        "<th style='padding:4px 8px 4px 8px; font-size:11pt;'>Invoice</th> " +
                        "<th style='padding:4px 8px 4px 8px; font-size:11pt;'>Date</th>"+
                        "<th style='padding:4px 8px 4px 8px; font-size:11pt;'>Debit</th>" +
                        "<th style='padding:4px 8px 4px 8px; font-size:11pt;'>Credit</th>" +
                        "<th style='padding:4px 8px 4px 8px; font-size:11pt;'>DR/CR</th>" +
                        "<th style='padding:4px 8px 4px 8px; font-size:11pt;'>Balance</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#content').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
              "<tr>"+
                "<td style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                        "<td valign='bottom' style='text-align:center; padding:4px 8px 4px 8px; font-size:11pt;'>THANK YOU</td>" +
                    "</tr>" +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(printchar);
        popupWin.document.close();
    };

    $scope.exportXls = function(){
      $("#contentexport").table2excel({
        exclude: ".excludeThisClass",
        name: "Customer Ledger",
        filename: "Customer Ledger" //do not include extension
      });
    };

});