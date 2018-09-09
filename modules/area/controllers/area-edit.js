// import admin
angular.module('area').controller('areaEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/area/edit/'+$scope.ctmId;

  $scope.getArea = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/area/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(area)
	    {
	    	area.forEach(function (value, key) {
	      		$scope.area = value;
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


  $scope.editArea = function () {

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
		    .success(function(login)
		    {
                $('#btnsave').text("Update Table Area");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/area';  
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
                $('#btnsave').text("Update Table Area");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	};

});