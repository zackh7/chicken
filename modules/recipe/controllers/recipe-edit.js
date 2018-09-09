// import admin
angular.module('recipe').controller('recipeEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


	$scope.productList = [];
	$scope.inventoryList = [];
	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/recipe/edit/'+$scope.ctmId;

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
	    	$scope.getInventoryList();
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

	$scope.getInventoryList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/inventory',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(inventoryList)
	    {
	    	$scope.inventoryList = angular.copy(inventoryList);
	    	$scope.getRecipe();
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

  $scope.getRecipe = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/recipe/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(recipe)
	    {
	    	recipe.forEach(function (value, key) {
	    		$scope.productList.forEach(function (value1, key1) {
	    			if(value.rm_pm_id == value1.pm_id){
		    			value.rm_pm = value1;
	    			}
		    	});
	    		$scope.inventoryList.forEach(function (value1, key1) {
	    			if(value.rm_im_id == value1.im_id){
		    			value.rm_im = value1;
	    			}
		    	});
	      		$scope.recipe = value;
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


  $scope.editRecipe = function () {

	  	if($('#rm_pm_id').val() == undefined || $('#rm_pm_id').val() == "" || $scope.recipe.rm_pm.pm_id == undefined){
	    	toastr.error('please select dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#rm_im_id').val() == undefined || $('#rm_im_id').val() == "" || $scope.recipe.rm_im.im_id == undefined){
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
		    .success(function(login)
		    {
                $('#btnsave').text("Update Recipe");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/recipe';  
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
                $('#btnsave').text("Update Recipe");
                $('#btnsave').removeAttr('disabled');  
		    });
		}
	};

});