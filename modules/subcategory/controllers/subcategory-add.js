// import admin
angular.module('subcategory').controller('subcategoryAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/subcategory/add';
	$scope.productList = [];
	$scope.subcategory = {};
	$scope.subcategory.sctm_username = $rootScope.userid;

	$scope.getProductList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/product',
	      //data: $scope.data,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(productList)
	    {
	    	$scope.productList = angular.copy(productList);
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
    $scope.getProductList();
	
  	$scope.addSubCategory = function () {
	    
	    if($('#sctm_pm_id').val() == undefined || $('#sctm_pm_id').val() == "" || $scope.subcategory.sctm_pm_id.pm_id == undefined){
	    	toastr.error('please select dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#sctm_type').val() == undefined || $('#sctm_type').val() == ""){
	    	toastr.error('please enter sub category name.', 'Error', {
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
		      data: $scope.subcategory,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Sub Category");
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
                $('#btnsave').text("Save Sub Category");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});