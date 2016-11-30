angular.module('app').controller('commissionCtrl', function($scope, mainService, commissionService){
  $scope.testing = "Comms page connected to controller";
    mainService.getUser().then(function(user){
      $scope.user = user;
      $scope.id = user.user_id;

    commissionService.salesThisWeek($scope.id).then(function(sales){
      $scope.sales = sales;
      console.log($scope.sales);
      });
    });

  $scope.setupFees = [];
  $scope.setupFeeTotal = 0;
  // $scope.example = $scope.sales[3].setup_fee;
  $scope.extractSetupFee = function(){
    for(var i = 0; i <$scope.sales.length; i++){
      $scope.setupFeeTotal += Number($scope.sales[i].setup_fee);
    }
  };


});
