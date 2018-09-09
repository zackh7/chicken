/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function SignupCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $scope.apiURL = 'http://localhost:3000';
	// $scope.apiURL = 'http://unitech.3commastechnologies.com:3000';
	// if(localStorage.getItem("pos_admin_access_token") != null)
 //      {
 //          window.location = '/greenair/';
 //      }
  


  	$scope.signup = function() {
  		var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
		var passwordRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;


  		if($scope.email == undefined || $scope.email == ""){
  			toastr.error('Please Enter Your Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#email').focus(); 
  		}
  		else if(!emailRegex.test($scope.email)){
            toastr.error('Please Enter A Valid Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#email').focus();
		}
  		else if($scope.password == undefined || $scope.password == ""){
  			toastr.error('Please Enter Your Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus();
  		}
  		else if(!passwordRegex.test($scope.password)){
            toastr.error('Please Enter A Valid Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus();
		}
  		else if($scope.conpassword == undefined || $scope.conpassword == ""){
  			toastr.error('Please Enter Confirm Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#conpassword').focus();
  		}
  		else if($('#password').val() != $('#conpassword').val()){
            toastr.error('Password Entered Does Not Match.. Please Try Again', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "1110",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus(); 
                $scope.password="";
                $scope.conpassword=""; 
        }
  		else{
                $('#signup').attr('disabled','true');
                $('#signup').text("please wait...");

                $http({
				    method: 'POST',
				   	url: $rootScope.baseURL+'/signup',
			        data:$scope.limit,
				      headers: {'Content-Type': 'application/json',
			                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
			    })
			    .success(function(product)
			    {
			      	toastr.success('Hoola, Account Created!', 'Success', {
			              closeButton: true,
			              progressBar: true,
			            positionClass: "toast-top-center",
			            timeOut: "500",
			            extendedTimeOut: "500",
			        });
		            window.location = 'login.html';
			    })
			    .error(function(data) 
			    {   
		            $scope.loading1 = 1;
			      	toastr.error('Oops, Something Went Wrong.', 'Error', {
			              closeButton: true,
			              progressBar: true,
			            positionClass: "toast-top-center",
			            timeOut: "500",
			            extendedTimeOut: "500",
			        });              
			    });
  		}
	}

	$scope.login = function(){
		window.location = 'login.html';
	};
	
	$scope.viewpassowrd = function() {
	    var x = document.getElementById("password");
	    if (x.type === "password") {
	        x.type = "text";
	        ;
	    } else {
	        x.type = "password";
	    }
	};
	$scope.viewconpassowrd = function() {
	    var x = document.getElementById("conpassword");
	    if (x.type === "password") {
	        x.type = "text";
	        ;
	    } else {
	        x.type = "password";
	    }
	};
	$(document).ready(function () {
        $('i').click(function () {
            $(this).toggleClass('fa-eye fa-eye-slash');
        });
    });






};


