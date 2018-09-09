// import admin
angular.module('subcategory').controller('subcategoryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.productList = [];
	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/subcategory/edit/'+$scope.ctmId;

  $scope.getProductList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/product',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(productList)
	    {
	    	$scope.productList = angular.copy(productList);
	    	$scope.getSubCategory();
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

  $scope.getSubCategory = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/subcategory/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(subcategory)
	    {
	    	subcategory.forEach(function (value, key) {
	    		$scope.productList.forEach(function (value1, key1) {
	    			if(value.sctm_pm_id == value1.pm_id){
		    			value.sctm_pm = value1;
	    			}
		    	});
	      		$scope.subcategory = value;
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


  $scope.editSubCategory = function () {

	  	if($('#sctm_pm_id').val() == undefined || $('#sctm_pm_id').val() == "" || $scope.subcategory.sctm_pm.pm_id == undefined){
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
		    .success(function(login)
		    {
                $('#btnsave').text("Update Sub Category");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/subcategory';  
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
                $('#btnsave').text("Update Sub Category");
                $('#btnsave').removeAttr('disabled');             
		    });
		}
	};

});