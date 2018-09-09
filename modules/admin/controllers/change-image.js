// import admin
angular.module('admin').controller('changeImageCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	

	$scope.first_name = $rootScope.firstname;

	$scope.fileupload = {};
	$scope.getUserImage = function (){

		if ($rootScope.iconimage != 'null' && $rootScope.iconimage !="") {
			$scope.displayImages = $rootScope.iconimage;
		}
		else{
			$scope.displayImages = "resources/images/default.png";
		}
    }
    $scope.getUserImage();

    function readURL(input) {
    if (input.files && input.files[0]) {
          var reader = new FileReader();

              $scope.fileupload.file = input.files[0];
          reader.onload = function (e) {
              $('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);

      }
  }

  $("#imgInp").change(function(){
      readURL(this);
  });

    $scope.changeImage = function (){
    	if($('#first_name').val() == undefined || $('#first_name').val() == ""){
	    	toastr.error('please enter name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
    	else{

    		var fd = new FormData();
      		fd.append('imgUploader', $scope.fileupload.file);
      		fd.append('firstname', $scope.first_name);

			$('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");
                
	    	$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/login/profile/image/'+$rootScope.userid,
		        data: fd,
		        transformRequest: angular.identity,
		      headers: {'Content-Type': undefined,
	                  'Authorization' :'Bearer '+localStorage.getItem("chicken_admin_access_token")}
		    })
		    .success(function(login)
		    {
	            $('#btnsave').text("Update Profile");
	            $('#btnsave').removeAttr('disabled');
	        	$scope.iconimages = login[0].icon_image;
		  	 	localStorage.setItem('chicken_admin_iconimage', $scope.iconimages);
		  	 	localStorage.setItem('chicken_admin_firstname', login[0].first_name);
    			$rootScope.iconimage=localStorage.getItem("chicken_admin_iconimage");
    			$rootScope.firstname=localStorage.getItem("chicken_admin_firstname");
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
                $('#btnsave').text("Update Profile");
                $('#btnsave').removeAttr('disabled');
		    });
    	}
                
    }

});