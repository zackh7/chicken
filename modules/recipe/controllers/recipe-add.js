// import admin
angular.module('recipe').controller('recipeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/recipe/add';
	$scope.productList = [];
	$scope.inventoryList = [];
	$scope.recipe = {};
	$scope.recipe.rm_username = $rootScope.userid;

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

    $scope.getInventoryList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/inventory',
	      //data: $scope.data,
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
	
  	$scope.addRecipe = function () {
	    
	    if($('#rm_pm_id').val() == undefined || $('#rm_pm_id').val() == "" || $scope.recipe.rm_pm_id.pm_id == undefined){
	    	toastr.error('please select dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#rm_im_id').val() == undefined || $('#rm_im_id').val() == "" || $scope.recipe.rm_im_id.im_id == undefined){
	    	toastr.error('please select product name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#rm_quantity').val() == undefined || $('#rm_quantity').val() == ""){
	    	toastr.error('please enter quantity.', 'Error', {
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
		      data: $scope.recipe,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Recipe");
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
                $('#btnsave').text("Save Recipe");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});