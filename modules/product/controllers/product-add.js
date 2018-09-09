// import admin
angular.module('product').controller('productAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	

	$scope.apiURL = $rootScope.baseURL+'/product/add';

	$scope.displayImages = "resources/assets/img/default-image.png";

	$scope.categoryList = [];
	$scope.product = {};
	$scope.product.pm_username = $rootScope.userid;

	/*$scope.onFileSelect = function ($files) {
        var reader = new FileReader();
        reader.readAsDataURL($files[0]);

        reader.onloadend = function () {
            var img_data = reader.result;
            var spl_dt = img_data.split(',');
            $scope.displayImages = 'data:image/png;base64, ' + spl_dt[1];
            $scope.displayImagesdb = spl_dt[1];
            $scope.$apply();
        };
    };*/
    $scope.onFileSelect = function ($files) {
        $scope.speakerIcon.photo = $files[0];
        $scope.fileName = $scope.speakerIcon.photo.name;
        var reader = new FileReader();
        reader.readAsDataURL($files[0]);

        reader.onloadend = function () {
            var img_data = reader.result;
            var spl_dt = img_data.split(',');
            $scope.displayImages = 'data:image/png;base64, ' + spl_dt[1];
            $scope.displayImagesdb = spl_dt[1];
            $scope.$apply();
        };
    };

    $scope.getCategoryList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/category',
	      //data: $scope.data,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(categoryList)
	    {
	    	$scope.categoryList = angular.copy(categoryList);
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
    $scope.getCategoryList();

  $scope.addProduct = function () {

	    if($('#pm_ctm_id').val() == undefined || $('#pm_ctm_id').val() == "" || $scope.product.pm_ctm_id.ctm_id == undefined){
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
                $('#btnsave').text("Save Dishes");
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
                $('#btnsave').text("Save Dishes");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	    
	};

});