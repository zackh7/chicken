/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function LoginCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	$scope.apiURL = 'http://localhost:3000';
	// $scope.apiURL = 'http://unitech.3commastechnologies.com:3000';
	// if(localStorage.getItem("chicken_admin_access_token") != null)
 //      {
 //          window.location = '/greenair/';
 //      }
  
  	$scope.login = function() {
  		console.log('test');
  		if($scope.username == undefined || $scope.username == ""){
  			toastr.error('please enter username.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	chickenitionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
  		}
  		else if($scope.password == undefined || $scope.password == ""){
  			toastr.error('please enter password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	chickenitionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
  		}
  		else{
                $('#login').attr('disabled','true');
                $('#login').text("please wait...");
  			$http({
		          method: 'POST',
		          url: $scope.apiURL+"/oauth/token",
		          data: 'grant_type=password&username='+ encodeURIComponent($scope.username) +'&password='+ encodeURIComponent($scope.password),
		          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                    'Authorization' : 'Basic Y2xpZW50S2V5OmNsaWVudFNlY3JldEtleQ=='}
			 })
		  	 .success(function(data, status, headers, config)
		  	 {
		  	 	if($scope.username == 'admin'){

			        $http({
			          method: 'POST',
			          url: $scope.apiURL+'/login/isonline',
			          data: 'username='+$scope.username,
			          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                  'Authorization' :'Bearer '+data.access_token}
			        })
			        .success(function(deliverycount)
			        {	
			        	$scope.user = deliverycount[0].username;
			        	$scope.firstname = deliverycount[0].first_name;
			        	$scope.iconimage = deliverycount[0].icon_image;
				  	 	localStorage.setItem('chicken_admin_username', $scope.user);
				  	 	localStorage.setItem('chicken_admin_firstname', $scope.firstname);
				  	 	localStorage.setItem('chicken_admin_iconimage', $scope.iconimage);
				  	 	localStorage.setItem('chicken_admin_access_token', data.access_token);
				        localStorage.setItem('chicken_admin_expires_in', data.expires_in);
				        localStorage.setItem('chicken_admin_refresh_token', data.refresh_token);
				        localStorage.setItem('chicken_admin_token_type', data.token_type);
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
				         window.location = "/chicken/";
			        })
			        .error(function(data) 
			        {   
			            toastr.error('Oops, Something Went Wrong.', 'Error', {
			              closeButton: true,
			              progressBar: true,
			              chickenitionClass: "toast-top-center",
			              timeOut: "500",
			              extendedTimeOut: "500",
			            });
		                $('#login').text("Login");
		                $('#login').removeAttr('disabled');
			        });

		  	 		
		  	 	}
		  	 	else{
			  	 	$scope.username = undefined;
		  	 		$scope.password = undefined;
		  	 		localStorage.removeItem('chicken_admin_access_token');
			        localStorage.removeItem('chicken_admin_expires_in');
			        localStorage.removeItem('chicken_admin_refresh_token');
			        localStorage.removeItem('chicken_admin_token_type');
			  	 	localStorage.removeItem('chicken_admin_username');
			  	 	localStorage.removeItem('chicken_admin_firstname');
			  	 	localStorage.removeItem('chicken_admin_iconimage');
			        localStorage.clear();
			        var dialog = bootbox.dialog({
		            message: '<p class="text-center">You Are Not Right User To Login!</p>',
		                closeButton: false
		            });
		            setTimeout(function(){
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
		                dialog.modal('hide'); 
		            }, 2000); 
		  	 	}
		  	 })
		  	 .error(function(data, status, headers, config)
		  	 {
		  	 	toastr.error('Invalid Username or Password.', 'Error', {
	              closeButton: true,
	              progressBar: true,
	              chickenitionClass: "toast-top-center",
	              timeOut: "500",
	              extendedTimeOut: "500",
	            });
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
		     });
  		}
	}

	$scope.signup = function(){
		window.location = 'signup.html';
	};

}


