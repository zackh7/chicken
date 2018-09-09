// import admin
angular.module('unit').controller('unitEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/unit/edit/'+$scope.ctmId;

  $scope.getUnit = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/unit/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(unit)
	    {
	    	unit.forEach(function (value, key) {
	      		$scope.unit = value;
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


  $scope.editUnit = function () {

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
		    .success(function(login)
		    {
                $('#btnsave').text("Update Unit");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/unit';  
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
                $('#btnsave').text("Update Unit");
                $('#btnsave').removeAttr('disabled');              
		    });
		}
	};

});