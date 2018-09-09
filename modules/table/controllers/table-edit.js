// import admin
angular.module('table').controller('tableEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.areaList = [];
	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/table/edit/'+$scope.ctmId;

  $scope.getAreaList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/area',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(areaList)
	    {
	    	$scope.areaList = angular.copy(areaList);
	    	$scope.getTable();
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

  $scope.getTable = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/table/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(table)
	    {
	    	table.forEach(function (value, key) {
	    		$scope.areaList.forEach(function (value1, key1) {
	    			if(value.tm_am_id == value1.am_id){
		    			value.tm_am = value1;
	    			}
		    	});
	      		$scope.table = value;
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


  $scope.editTable = function () {

	  	if($('#tm_am_id').val() == undefined || $('#tm_am_id').val() == "" || $scope.table.tm_am.am_id == undefined){
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
		    .success(function(login)
		    {
                $('#btnsave').text("Update Tables");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/table';  
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
                $('#btnsave').text("Update Tables");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	};

});