// import admin
angular.module('admin').controller('changePasswordCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	

  $scope.changePassword = function () {


	    if($('#curpassword').val() === undefined || $('#curpassword').val() === ""){
	    	toastr.error('please enter current password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#password').val() === undefined || $('#password').val() === ""){
	    	toastr.error('please enter new password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#conpassword').val() == undefined || $('#conpassword').val() == ""){
	    	toastr.error('please enter confirm password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#conpassword').val() != $('#password').val()){
	    	toastr.error('the new password and confirm password do not match.', 'Error', {
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
            $scope.user.username = $rootScope.userid;
    		$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/login/changepassword',
		      data: $scope.user,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("chicken_admin_access_token")}
		    })
		    .success(function(login)
		    {
		    	if(login.length == 0){
		    		toastr.error('current password do not match.', 'Error', {
				        closeButton: true,
				        progressBar: true,
					  	positionClass: "toast-top-center",
					  	timeOut: "500",
					  	extendedTimeOut: "500",
				    });
	                $('#btnsave').text("Update Password");
	                $('#btnsave').removeAttr('disabled');
		    	}
		    	else{
		    		$('#btnsave').text("Update Password");
	                $('#btnsave').removeAttr('disabled');
			       	window.location.href = '#/';
		    	}
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
                $('#btnsave').text("Update Password");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	    
	};

});