// import admin
angular.module('unit').controller('unitAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/unit/add';
	$scope.unit = {};
	$scope.unit.um_username = $rootScope.userid;
	
  	$scope.addUnit = function () {
	    
	    if($('#um_name').val() == undefined || $('#um_name').val() == ""){
	    	toastr.error('please enter unit name.', 'Error', {
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
		      data: $scope.unit,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Unit");
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
                $('#btnsave').text("Save Unit");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});