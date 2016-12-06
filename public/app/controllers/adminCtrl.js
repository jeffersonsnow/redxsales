angular.module('app').controller('adminCtrl', function($scope, mainService, adminService, quotaService, $state){
  $scope.admintest = "Admin is connected to controller.";
  $scope.quotaModel = {};
  $scope.showQuotaTab = false;

  mainService.getAllUsers().then(function(users){
    $scope.users = users;
  });

  quotaService.getQuota().then(function(quota){
      $scope.quota = quota[0];
      console.log($scope.quota);
});


  $scope.submitQuota = function (){
    $scope.quotaModel.quota_time = new Date();
    $state.reload();
    adminService.postQuota($scope.quotaModel);
  };


});
