// import admin
angular.module('category').controller('categoryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/category/edit/'+$scope.ctmId;

  $scope.getCategory = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/category/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(category)
	    {
	    	category.forEach(function (value, key) {
	      		$scope.category = value;
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


  $scope.editCategory = function () {

	  	if($('#ctm_type').val() == undefined || $('#ctm_type').val() == ""){
	    	toastr.error('please enter category name.', 'Error', {
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
		      data: $scope.category,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("Update Category");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/category';  
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
                $('#btnsave').text("Update Category");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	};

});