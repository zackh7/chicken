angular.module('chicken',
    [
// External Dependencies
        'ngRoute',
        'oc.lazyLoad',
        // 'ngValidate',
        'ui.bootstrap',
        'angularFileUpload',
        'ngIdle',
        // 'ngAnimate',
        // 'toastr',
        //'Modular Dependencies',
        'admin',
        'user',
        'role',
        // 'category',
        // 'product',
        // 'subcategory',
        // 'unit',
        // 'inventory',
        // 'recipe',
        // 'area',
        // 'table',
        // 'dealer',
        // 'purchase',
        // 'purcashbook',
        // 'customer',
        // 'dinein',
        // 'order',
        // 'takeaway',
        // 'kitchen',
        // 'sale',
        // 'delivery',
        // 'expense',
        // 'expensetype',
        // 'dailyexpense',
        // 'report',
    // ]).config(cityMotorRouter);

]).config(function($routeProvider, IdleProvider, KeepaliveProvider, $controllerProvider) {
  // configure Idle settings
  IdleProvider.idle(3600); // in seconds
  IdleProvider.timeout(5); // in seconds
  KeepaliveProvider.interval(2); // in seconds
  $controllerProvider.allowGlobals();
  $routeProvider
})
.run(function(Idle){
  // start watching when the app runs. also starts the Keepalive service by default.
  Idle.watch();
});/*
factory('mySocket', function (socketFactory) {
  var mySocket = socketFactory();
  mySocket.forward('error');
  return mySocket;
});*/
// function cityMotorRouter($routeProvider, IdleProvider, KeepaliveProvider, $controllerProvider) {
//     $controllerProvider.allowGlobals();
//     $routeProvider
// }

