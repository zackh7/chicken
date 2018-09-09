// import admin
angular.module('table').controller('tableAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/table/add';
	$scope.areaList = [];
	$scope.table = {};
	$scope.table.tm_username = $rootScope.userid;

	$scope.getAreaList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/area',
	      //data: $scope.data,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(areaList)
	    {
	    	$scope.areaList = angular.copy(areaList);
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
    $scope.getAreaList();

	
  	$scope.addTable = function () {
	    
	    if($('#tm_am_id').val() == undefined || $('#tm_am_id').val() == "" || $scope.table.tm_am_id.am_id == undefined){
	    	toastr.error('please select table area name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#tm_description').val() === undefined || $('#tm_description').val() === ""){
	    	toastr.error('please enter table name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    } 
	    else if($('#tm_size').val() == undefined || $('#tm_size').val() == ""){
	    	toastr.error('please select table size.', 'Error', {
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
		      data: $scope.table,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(table)
		    {
                $('#btnsave').text("Save Tables");
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
                $('#btnsave').text("Save Tables");
                $('#btnsave').removeAttr('disabled');
		    });
	    }
	     
	};

});