// import admin
angular.module('inventory').controller('inventoryAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/inventory/add';
	$scope.unitList = [];
	$scope.inventory = {};
	$scope.inventory.im_username = $rootScope.userid;

	$scope.getUnitList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/unit',
	      //data: $scope.data,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(unitList)
	    {
	    	$scope.unitList = angular.copy(unitList);
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
    $scope.getUnitList();
	
  	$scope.addInventory = function () {
	    
	    if($('#im_name').val() == undefined || $('#im_name').val() == ""){
	    	toastr.error('please enter product name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#im_um_id').val() == undefined || $('#im_um_id').val() == "" || $scope.inventory.im_um_id.um_id == undefined){
	    	toastr.error('please select unit name.', 'Error', {
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
		      data: $scope.inventory,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Product");
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
                $('#btnsave').text("Save Product");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});