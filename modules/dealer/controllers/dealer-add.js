// import admin
angular.module('dealer').controller('dealerAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/dealer/add';
	$scope.dealer = {};
	$scope.dealer.dm_username = $rootScope.userid;
	$scope.dealer.dm_number ="N/A";
	$scope.dealer.dm_address ="N/A";
	$scope.dealer.dm_credit ="0";
	$scope.dealer.dm_opening_credit ="0";
	$scope.dealer.dm_debit ="0";
	$scope.dealer.dm_opening_debit ="0";

	
  	$scope.addDealer = function () {
	    
	    if($('#dm_firm_name').val() == undefined || $('#dm_firm_name').val() == ""){
	    	toastr.error('please enter dealer name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#dm_number').val() == undefined || $('#dm_number').val() == ""){
	    	toastr.error('please enter mobile number.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#dm_address').val() == undefined || $('#dm_address').val() == ""){
	    	toastr.error('please enter address.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#dm_credit').val() == undefined || $('#dm_credit').val() == ""){
	    	toastr.error('please enter credit.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#dm_opening_credit').val() == undefined || $('#dm_opening_credit').val() == ""){
	    	toastr.error('please enter opening credit.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#dm_debit').val() == undefined || $('#dm_debit').val() == ""){
	    	toastr.error('please enter debit.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#dm_opening_debit').val() == undefined || $('#dm_opening_debit').val() == ""){
	    	toastr.error('please enter opening debit.', 'Error', {
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
	    	$http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.dealer,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Dealer");
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
                $('#btnsave').text("Save Dealer");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});