// import admin
angular.module('area').controller('areaAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/area/add';
	$scope.area = {};
	$scope.area.am_username = $rootScope.userid;
	
  	$scope.addArea = function () {
	    
	    if($('#am_name').val() == undefined || $('#am_name').val() == ""){
	    	toastr.error('please enter table area name.', 'Error', {
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
		      data: $scope.area,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(area)
		    {
                $('#btnsave').text("Save Table Area");
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
                $('#btnsave').text("Save Table Area");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});