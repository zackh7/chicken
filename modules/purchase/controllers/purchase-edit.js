// import admin
angular.module('purchase').controller('purchaseEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

	$scope.ctmId = $routeParams.ctmId;
	$scope.dealerList = [];
    $scope.inventoryList = [];
    $scope.selectedProductList = [];
    $scope.selectedProductListRemove = [];
    $scope.selectedProductListAdd = [];
	$scope.purchase = {};
    $scope.parseFloat = parseFloat;
  $scope.apiURL = $rootScope.baseURL+'/purchase/edit/'+$scope.ctmId;

  $('#prm_date').datetimepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'Y-m-d',
        onChangeDateTime: function (dp, $input) {
            $scope.purchase.prm_date = $('#prm_date').val();
        }
    });

    $('#prm_payment_date').datetimepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'Y-m-d',
        onChangeDateTime: function (dp, $input) {
            $scope.purchase.prm_payment_date = $('#prm_payment_date').val();
        }
    });

    $scope.getDealerList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/dealer/',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(dealerList)
	    {
	    	$scope.dealerList = angular.copy(dealerList);
	    	$scope.getPurchase();
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

	$scope.creditShow = function(){
        if($scope.purchase.prm_credit == 'cash'){
            $('#paymentdate').hide();
            $scope.purchase.prm_payment_date = null;
        }
        else{
            $scope.purchase.prm_payment_date = undefined;
            $('#paymentdate').show();
        }
    }

  	$scope.getPurchase = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/purchase/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(purchase)
	    {
	    	purchase.forEach(function (value, key) {
	      		value.prm_date = $filter('date')(value.prm_date, "mediumDate");
                value.prm_payment_date = $filter('date')(value.prm_payment_date, "mediumDate");
                if(value.prm_credit == "cash"){
                    $('#paymentdate').hide();
                }
                value.old_prm_amount = value.prm_amount;
                value.old_prm_credit = value.prm_credit;
                $scope.dealerList.forEach(function (value1, key1) {
                    if(value.prm_dm_id == value1.dm_id){
                        value.old_prm_dm_id = value1;
                        value.prm_dm = value1;
                    }
                });
                $scope.purchase = value;
                $http({
			        method: 'GET',
			        url: $rootScope.baseURL+'/purchase/details/'+$scope.ctmId,
			        headers: {'Content-Type': 'application/json',
			                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
			      })
			      .success(function(selectedProductList)
			      {
			        var i = 1;
			        selectedProductList.forEach(function (value, key) {
			              value.srno = i++;
			              value.old_ppm_qty = value.ppm_qty;
			              console.log(value);
			              $scope.selectedProductList.push(value);
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

	$scope.getInventoryList = function(){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/inventory',
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
        })
        .success(function(inventoryList)
        {
            $scope.inventoryList = angular.copy(inventoryList);
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
    $scope.getInventoryList();

    $scope.setItemDetails = function(){
        $scope.productObj.ppm_qty = 1;
        $scope.productObj.ppm_rate = 0;
    };

    $scope.addToCart = function(){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($('#ppm_im_id').val() == undefined || $('#ppm_im_id').val() == "" || $scope.productObj.im_search.im_id == undefined){
            toastr.error('please select product.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
        }
        else if($('#ppm_qty').val() == undefined || $('#ppm_qty').val() == ""){
            toastr.error('please enter quantity.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
        }
        else if($('#ppm_rate').val() == undefined || $('#ppm_rate').val() == "" || !numRegex.test($('#ppm_rate').val())){
            toastr.error('please enter price.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
        }
        else{
            $scope.selectedProductListAdd.push($scope.productObj);
            $scope.productObj = null;
            $scope.calculateTotal();
           $('#ppm_im_id').focus();
        }
    };

    $scope.removeItem = function(index){
        $scope.selectedProductListRemove.push($scope.selectedProductList[index]);
        $scope.selectedProductList.splice(index,1);
        $scope.calculateTotal();
           $('#ppm_im_id').focus();
    };

    $scope.removeItem1 = function(index){
        $scope.selectedProductListAdd.splice(index,1);
        $scope.calculateTotal();
           $('#ppm_im_id').focus();
    };

    $scope.calculateTotal = function(){
        var i = 1;
        $scope.purchase.amount = 0;
        angular.forEach($scope.selectedProductList, function(value, key) {
            value.srno = i++;
            $scope.purchase.amount = $scope.purchase.amount + value.ppm_qty * value.ppm_rate;
        });
        angular.forEach($scope.selectedProductListAdd, function(value, key) {
            value.srno = i++;
            $scope.purchase.amount = $scope.purchase.amount + value.ppm_qty * value.ppm_rate;
        });
        $scope.purchase.prm_amount = parseFloat($scope.purchase.amount).toFixed(2);
        // $scope.convertNumberToWords($scope.purchase.prm_amount);
    };


  	$scope.editPurchase = function () {
	    
        if($('#invoiceType').val() == undefined || $('#invoiceType').val() == ""){
            toastr.error('please select credit / cash.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
        }
	    else if($scope.purchase.prm_credit == "credit" && ($('#prm_payment_date').val() == undefined || $('#prm_payment_date').val() == "")){
	    	toastr.error('please select payment date.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
        else if($('#prm_dm_id').val() == undefined || $('#prm_dm_id').val() == "" || $scope.purchase.prm_dm.dm_id == undefined){
            toastr.error('please select dealer name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
        }
        else if($('#prm_comment').val() == undefined || $('#prm_comment').val() == ""){
            toastr.error('please enter comment', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
        }
        else if($scope.selectedProductList.length == 0 && $scope.selectedProductListAdd.length == 0 ){
            toastr.error('please add product to list', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
        }
	    else{
            $('#btnsave').attr('disabled','true');
        	$('#btnsave').text("please wait...");
        	$scope.purchase.prm_date = $('#prm_date').val();
            $scope.purchase.prm_payment_date = $('#prm_payment_date').val();
            $scope.pruchaseForm = {
                purchaseSingleData : $scope.purchase,
                purchaseMultipleData : $scope.selectedProductList,
                purchaseadd : $scope.selectedProductListAdd,
                purchaseremove : $scope.selectedProductListRemove
            };
	    	$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/purchase/edit/'+$scope.ctmId,
		      data: $scope.pruchaseForm,
      		  headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Update Purchase");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/purchase';  
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
                $('#btnsave').text("Update Purchase");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});