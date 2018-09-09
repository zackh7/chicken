// import admin
angular.module('inventory').controller('inventoryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.unitList = [];
	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/inventory/edit/'+$scope.ctmId;


  	$scope.getUnitList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/unit',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(unitList)
	    {
	    	$scope.unitList = angular.copy(unitList);
	    	$scope.getInventory();
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

  $scope.getInventory = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/inventory/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(inventory)
	    {
	    	inventory.forEach(function (value, key) {
	    		$scope.unitList.forEach(function (value1, key1) {
	    			if(value.im_um_id == value1.um_id){
		    			value.im_um = value1;
	    			}
		    	});
	      		$scope.inventory = value;
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


  $scope.editInventory = function () {

	  	if($('#im_name').val() == undefined || $('#im_name').val() == ""){
	    	toastr.error('please enter product name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#im_um_id').val() == undefined || $('#im_um_id').val() == "" || $scope.inventory.im_um.um_id == undefined){
	    	toastr.error('please select unit name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#im_quantity').val() == undefined || $('#im_quantity').val() == ""){
	    	toastr.error('please enter available quantity.', 'Error', {
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
		    .success(function(login)
		    {
                $('#btnsave').text("Update Product");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/inventory';  
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
                $('#btnsave').text("Update Product");
                $('#btnsave').removeAttr('disabled');  
		    });
		}
	};

});