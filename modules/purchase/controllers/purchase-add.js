// import admin
angular.module('purchase').controller('purchaseAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.dealerList = [];
    $scope.inventoryList = [];
    $scope.selectedProductList = [];
	$scope.purchase = {};
    $scope.parseFloat = parseFloat;
	$scope.purchase.prm_username = $rootScope.userid;

    $scope.purchase.prm_credit = "credit";
    $scope.purchase.prm_comment = "N/A";
    $scope.purchase.prm_amount = "0.00";

	var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.purchase.prm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

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

    $scope.getOrderNo = function() {
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/purchase/invoice/no',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
        })
        .success(function(orderno)
        {
            if(orderno.length >0)
                $scope.purchase.prm_invoice_no = parseInt(orderno[0].prm_invoice_no) + 1;
            else
                $scope.purchase.prm_invoice_no = 1;


    		$scope.getDealerList();
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
    $scope.getOrderNo();

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
            $scope.selectedProductList.push($scope.productObj);
            $scope.productObj = null;
            $scope.calculateTotal();
           $('#ppm_im_id').focus();
        }
    };

    $scope.removeItem = function(index){
        $scope.selectedProductList.splice(index,1);
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

        $scope.purchase.prm_amount = parseFloat($scope.purchase.amount).toFixed(2);
        
    };
	
  	$scope.addPurchase = function () {
	    
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
        else if($('#prm_dm_id').val() == undefined || $('#prm_dm_id').val() == "" || $scope.purchase.prm_dm_id.dm_id == undefined){
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
        else if($scope.selectedProductList.length == 0){
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
                purchaseMultipleData : $scope.selectedProductList
            };
	    	$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/purchase/add',
		      data: $scope.pruchaseForm,
      		  headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Purchase");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/';  
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
                $('#btnsave').text("Save Purchase");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});