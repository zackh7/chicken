// import admin
angular.module('role').controller('roleEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  	$scope.role={};
    $scope.permissionList=[];
	$scope.roleId = $routeParams.roleId;
  $scope.apiURL = $rootScope.baseURL+'/role/edit/'+$scope.roleId;
  
$scope.getrolepermission=function(){
      if(localStorage.getItem('chicken_roleedit_permission') == 0){
       var dialog = bootbox.dialog({
            message: '<p class="text-center">You Are Not Authorized</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
            window.history.back();
      }
    };
    $scope.getrolepermission();
  $scope.getrole = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/role/'+$scope.roleId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("chicken_admin_access_token")}
	    })
	    .success(function(roleobj)
	    {
	    	roleobj.forEach(function (value, key) {
	    		$scope.role=value;
              });
	    })
	    .error(function(data) 
	    {   
	      var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);            
	    });
	};
    $scope.getrole();
    $scope.getPermission = function(){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/role/permission/'+$scope.roleId,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("chicken_admin_access_token")}
        })
        .success(function(obj)
        {

                obj.forEach(function(value, key){
                    if(value.rpm_add==1){
                      value.rpm_add = true;
                    }
                    if(value.rpm_edit==1){
                      value.rpm_edit = true;
                    }if(value.rpm_delete==1){
                      value.rpm_delete = true;
                    }if(value.rpm_list==1){
                      value.rpm_list = true;
                    }
                    $scope.permissionList.push(value);
                });
                console.log($scope.permissionList);
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
    $scope.getPermission();

/*	$scope.checkstatus = function() {
        $scope.permissionList.forEach(function(value, key){
            if (value.rpm_add == true){
                value.pm_add=1;
            }
            else{
                if(value.rpm_add == false){

                    value.pm_add=0;
                }
            }
            if (value.rpm_edit == true){
                value.pm_edit=1;
            }
            else{
                if(value.rpm_edit == false){
                value.pm_edit=0; 
                }
            }

            if (value.rpm_delete == true){
                value.pm_delete=1;
            }
            else{
                if(value.rpm_delete == false){
                value.pm_delete=0; 
                }
            }
            if (value.rpm_list == true){
                value.pm_list=1;
            }
            else{
                if(value.rpm_list == false){
                value.pm_list=0; 
                }
            }
        });
    };*/


  $scope.updateRole = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	    if($('#rm_name').val() == undefined || $('#rm_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Roll Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#rm_description').val() == undefined || $('#rm_description').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Description.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
	    else{
	    		$scope.obj={
                    role:$scope.role,
                    permission:$scope.permissionList
                }
                console.log($scope.obj);
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");
		    $http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.obj,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("chicken_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("SAVE");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/role';  
		    })
		    .error(function(data) 
		    {   
		      var dialog = bootbox.dialog({
	            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
	                closeButton: false
	            });
	            setTimeout(function(){
                $('#btnsave').text("SAVE");
                $('#btnsave').removeAttr('disabled');
	                dialog.modal('hide'); 
	            }, 1500);            
		    });
		}
	};

});