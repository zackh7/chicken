// import admin
angular.module('employee').controller('employeeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
    $scope.employee = {};
    $('#emp_name').focus();


	$scope.apiURL = $rootScope.baseURL+'/employee/add';

     $scope.displayImage = "resources/images/default-image.png";
  function readURL(input) {
    if (input.files && input.files[0]) {
          var reader = new FileReader();

              $scope.employee.file = input.files[0];
          reader.onload = function (e) {
              $('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);

      }
  }

  $("#emp_image").change(function(){
      readURL(this);
  });

    
    $scope.addEmployee = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#emp_name').val() == undefined || $('#emp_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Employee Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_name').focus();
            }, 1500);
        }
	    else if($('#emp_mobile').val() == undefined || $('#emp_mobile').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Mobile Number.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_mobile').focus(); 
            }, 1500);
            
	    }
      else if($('#emp_address').val() == undefined || $('#emp_address').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Residential Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_address').focus(); 
            }, 1500);
      }
        else if($('#emp_correspondence_address').val() == undefined || $('#emp_correspondence_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Correspondence Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_correspondence_address').focus(); 
            }, 1500);

        }
        else if($('#emp_aadhar_no').val() == undefined || $('#emp_aadhar_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Adhaar Number.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_aadhar_no').focus(); 
            }, 1500);
        }
        else if($('#emp_pancard_no').val() == undefined || $('#emp_pancard_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Pan Card.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_pancard_no').focus();  
            }, 1500);
        }
        else if($('#emp_designation').val() == undefined || $('#emp_designation').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Designation.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_designation').focus();  
            }, 1500);
        }
        else if($('#emp_emp_no').val() == undefined || $('#emp_emp_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Employee ID.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_emp_no').focus(); 
            }, 1500);
        }
        else if($('#emp_email_id').val() == undefined || $('#emp_email_id').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Email-Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_email_id').focus();  
            }, 1500);
        }
        else if($('#emp_qualification').val() == undefined || $('#emp_qualification').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Qualification.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_qualification').focus();  
            }, 1500);
        }/*
        else if($('#emp_image').val() == undefined || $('#emp_image').val() == ""){
            var dialem_photoog = bootbox.dialog({
            message: '<p class="text-center">please Add Image.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }*/
	    else{

                var fd = new FormData();
                fd.append('emp_name', $scope.employee.emp_name);
                fd.append('emp_mobile', $scope.employee.emp_mobile);
                fd.append('emp_address',$scope.employee.emp_address);
                fd.append('emp_correspondence_address',$scope.employee.emp_correspondence_address);
                fd.append('emp_aadhar_no',$scope.employee.emp_aadhar_no);
                fd.append('emp_pancard_no',$scope.employee.emp_pancard_no);
                fd.append('emp_designation',$scope.employee.emp_designation);
                fd.append('emp_emp_no',$scope.employee.emp_emp_no);
                fd.append('emp_email_id',$scope.employee.emp_email_id);
                fd.append('emp_qualification',$scope.employee.emp_qualification);
                fd.append('imgUploader', $scope.employee.file);
                    
                    $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: fd,
                      transformRequest: angular.identity,
                      headers: {'Content-Type': undefined,
                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(employees)
                    {
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/employee';  
                    })
                    .error(function(data) 
                    {   
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                            closeButton: false
                        });
                        setTimeout(function(){
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide');  
                        }, 1500);
                    });
		}
	};

});