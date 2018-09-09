// import admin
angular.module('customer').controller('customerEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $("#cm_name").focus();
  $scope.customerId = $routeParams.customerId;
  $scope.apiURL = $rootScope.baseURL+'/customer/edit/'+$scope.customerId;




  $scope.getCustomer = function () {
       $http({
        method: 'GET',
        url: $rootScope.baseURL+'/customer/'+$scope.customerId,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(customer)
      {
        customer.forEach(function (value, key) {
            
            $scope.customer = value;
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

    

  $scope.updateCustomer = function () {

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
        }
        
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
        }
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
                          $('#btnsave').html("UPDATE");
                          $('#btnsave').removeAttr('disabled');
                     window.location.href = '#/customer';  
                  })
                  .error(function(data) 
                  {   
                    var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                            closeButton: false
                        });
                        setTimeout(function(){
                          $('#btnsave').html("UPDATE");
                          $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide'); 
                        }, 1500);            
                  });
                }
              
    
  };

});