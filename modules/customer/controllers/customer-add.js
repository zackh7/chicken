// import admin
angular.module('customer').controller('customerAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  

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
  $('#customerindex').removeClass("active");
  $('#newemployeeindex').removeClass("active");
  $('#newpurchaseindex').removeClass("active");
  $('#newpurchasereturnindex').removeClass("active");
  $('#newsaleindex').removeClass("active");
  $('#newsalereturnindex').removeClass("active");
  $('#newexpenseindex').removeClass("active");
  $('#newpurexpenseindex').removeClass("active");
  $('#newproductindex').removeClass("active");
  $('#usersindex').addClass("active");
  $('#newcustomerindex').addClass("active");
    $scope.loading1=0;
    $scope.customer = {};
    $scope.customer.cm_com_id = localStorage.getItem("com_id");
    $scope.customer.cm_mobile = "N/A";
    $scope.customer.cm_address = "N/A";
    // $scope.customer.cm_state = "N/A";
    // $scope.customer.cm_city = "N/A";
    $scope.customer.cm_pin = "N/A";
    $("#cm_name").focus();

    /*$scope.getsamecheck = function(){
      if($('#samecheck:checkbox:checked').length > 0){
        $rootScope.stateInfo.forEach(function (value1, key1) {
          if (value1.state == $scope.customer.cm_state)
          {
            $scope.city1 = value1.cities;
          }
        });
        $scope.customer.cm_del_address = $scope.customer.cm_address;
        $scope.customer.cm_del_state = $scope.customer.cm_state;
        $scope.customer.cm_del_city = $scope.customer.cm_city;
        $scope.customer.cm_del_pin = $scope.customer.cm_pin;
      }
      else{
        $scope.customer.cm_del_address = undefined;
        $scope.customer.cm_del_state = undefined;
        $scope.customer.cm_del_city = undefined;
        $scope.customer.cm_del_pin = undefined;
      }
    };*/

$scope.getAll=function(){
  $scope.loading1=1;
};
    var socket = io.connect('http://localhost:3000');
	$scope.apiURL = $rootScope.baseURL+'/customer/add';
    $scope.addCustomer = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
      if($('#cm_name').val() == undefined || $('#cm_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_name").focus();
            }, 1500);
	    }
        else if($('#cm_address').val() == undefined || $('#cm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_address").focus();
            }, 1500);
        }/*
        else if($('#cm_state').val() == undefined || $('#cm_state').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter state.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_state").focus();
            }, 1500);
        }
        else if($('#cm_city').val() == undefined || $('#cm_city').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter city.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_city").focus();
            }, 1500);
        }*/
        else if($('#cm_pin').val() == undefined || $('#cm_pin').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter pin code.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_pin").focus();
            }, 1500);
        }/*
        else if($('#cm_del_address').val() == undefined || $('#cm_del_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter delivery address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_del_address").focus();
            }, 1500);
        }
        else if($('#cm_del_state').val() == undefined || $('#cm_del_state').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter delivery state.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_del_state").focus();
            }, 1500);
        }
        else if($('#cm_del_city').val() == undefined || $('#cm_del_city').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter delivery city.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_del_city").focus();
            }, 1500);
        }
        else if($('#cm_del_pin').val() == undefined || $('#cm_del_pin').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter delivery pin code.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_del_pin").focus();
            }, 1500);
        }*/
	    else if($('#cm_mobile').val() == undefined || $('#cm_mobile').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_mobile").focus();
            }, 1500);
	    }
	    // else if(!nameRegex.test($('#cm_mobile').val())){
	    // 	var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter Mobile no. in digits</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
	    // }
	    // else if($('#cm_mobile').val().length < 10){
	    // 	var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter a valid Mobile no.</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
	    // }
                else{

                  $http({
                    method: 'POST',
                    url: $scope.apiURL,
                    data: $scope.customer,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                  })
                  .success(function(login)
                  {
                      $('#btnsave').text("Save Dishes");
                      $('#btnsave').removeAttr('disabled');
                      
                      socket.emit('tobackend', {customer:login})
                        $scope.customer.push(login);
                      window.location.href = '#/'; 
                  })
                  .error(function(data) 
                  {   
                    var dialog = bootbox.dialog({
                      message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                          closeButton: false
                      });
                      setTimeout(function(){
                      $('#btnsave').html("SAVE");
                      $('#btnsave').removeAttr('disabled');
                          dialog.modal('hide'); 
                      }, 1500);            
                  });
                }
              }
            });

