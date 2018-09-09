// import admin
angular.module('product').controller('productEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.categoryList = [];
	$scope.productId = $routeParams.productId;
 	$scope.apiURL = $rootScope.baseURL+'/product/edit/'+$scope.productId;


 	$scope.onFileSelect = function ($files) {
        var reader = new FileReader();
        reader.readAsDataURL($files[0]);

        reader.onloadend = function () {
            var img_data = reader.result;
            var spl_dt = img_data.split(',');
            $scope.displayImages = 'data:image/png;base64,' + spl_dt[1];
            $scope.displayImagesdb = spl_dt[1];
            $scope.$apply();
        };
    };

	$scope.getCategoryList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/category',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(categoryList)
	    {
	    	$scope.categoryList = angular.copy(categoryList);
	    	$scope.getProduct();
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

  $scope.getProduct = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/product/'+$scope.productId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(product)
	    {
	    	product.forEach(function (value, key) {
	    		$scope.categoryList.forEach(function (value1, key1) {
	    			if(value.pm_ctm_id == value1.ctm_id){
		    			value.pm_ctm = value1;
	    			}
			    	if(value.pm_image!=null)
		    			$scope.displayImages = 'data:image/png;base64,' + value.pm_image;
		    		else
		    			$scope.displayImages = "resources/assets/img/default-image.png";
		    	});
	      		$scope.product = value;
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

  $scope.editProduct = function () {
		if($('#pm_ctm_id').val() == undefined || $('#pm_ctm_id').val() == "" || $scope.product.pm_ctm.ctm_id == undefined){
	    	toastr.error('please select category name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#pm_description').val() === undefined || $('#pm_description').val() === ""){
	    	toastr.error('please enter dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#pm_quantity').val() == undefined || $('#pm_quantity').val() == ""){
	    	toastr.error('please enter quantity.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#pm_rate').val() == undefined || $('#pm_rate').val() == ""){
	    	toastr.error('please enter price.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else
	    {

	  		$scope.formEntry = {
		    	image : $scope.displayImagesdb,
		    	product : $scope.product
		    }
		    
            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");
		    $http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.formEntry,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("Update Dishes");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/product';  
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
                $('#btnsave').text("Update Dishes");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	};

});