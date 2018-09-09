// import admin
angular.module('purcashbook').controller('purcashbookAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.purcashbook = {};
    $scope.purcashbook.pcm_comment = "N/A";
    $scope.purcashbook.pcm_received_by = "N/A";
    $scope.purcashbook.pcm_payment_mode = "Cash";
    $scope.purcashbook.pcm_username = $rootScope.userid;
    $('#cheq').hide();

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.purcashbook.pcm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $('#pcm_date').datetimepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'Y-m-d',
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.purcashbook.pcm_date = $('#pcm_date').val();
            // $('#end-date-picker').val(endDate); 
        }
    });

    $('#pcm_cheque_date').datetimepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'Y-m-d',
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.purcashbook.pcm_cheque_date = $('#pcm_cheque_date').val();
            // $('#end-date-picker').val(endDate); 
        }
    });

    $scope.getDealerList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/dealer/',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(dealerList)
	    {
	    	$scope.dealerList = angular.copy(dealerList);
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
    $scope.getDealerList();

    $scope.chequeShow = function(){
        if ($scope.purcashbook.pcm_payment_mode == "Cheque") {
            $('#cheq').show();
        }
        else{
            $('#cheq').hide();
        }
    }

    $scope.addPurcashbook = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($('#pcm_dm_id').val() == undefined || $('#pcm_dm_id').val() == "" || $scope.purcashbook.pcm_dm_id.dm_id == undefined){
            toastr.error('please select dealer name.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });
        }
        else if($('#pcm_received_by').val() == undefined || $('#pcm_received_by').val() == ""){
            toastr.error('please enter received by.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });
        }
        else if($('#pcm_comment').val() == undefined || $('#pcm_comment').val() == ""){
            toastr.error('please enter comment.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });
        }
        else if($scope.purcashbook.pcm_payment_mode == undefined || $scope.purcashbook.pcm_payment_mode == ""){
            toastr.error('please select payment mode.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });
        }
        else if($('#pcm_amount').val() == undefined || $('#pcm_amount').val() == "" || !numRegex.test($('#pcm_amount').val())){
            toastr.error('please enter amount.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });
        }
        else if($scope.purcashbook.pcm_payment_mode === "Cheque" && ($('#pcm_cheque_no').val() == undefined || $('#pcm_cheque_no').val() == "" || $('#pcm_cheque_no').val().length < 6 || !nameRegex.test($('#pcm_cheque_no').val()))){
            toastr.error('please enter a valid cheque no.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });
        }
        else if($scope.purcashbook.pcm_payment_mode === "Cheque" && ($('#pcm_cheque_date').val() == undefined || $('#pcm_cheque_date').val() == "")){
            toastr.error('please select cheque date.', 'Error', {
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
            $scope.purcashbook.pcm_date = $('#pcm_date').val();
            // $scope.purcashbook.pcm_cheque_date = $('#pcm_cheque_date').val();
            $scope.apiURL = $rootScope.baseURL+'/purcashbook/add';
    	    $http({
    	      method: 'POST',
    	      url: $scope.apiURL,
    	      data: $scope.purcashbook,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
    	    })
    	    .success(function(login)
    	    {
                $('#btnsave').text("Save Purchase Cashbook");
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
                $('#btnsave').text("Save Purchase Cashbook");
                $('#btnsave').removeAttr('disabled');          
    	    });
        }
	};

});