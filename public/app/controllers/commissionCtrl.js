angular.module('app').controller('commissionCtrl', function($scope, mainService, commissionService){
  $scope.testing = "Comms page connected to controller";
  $scope.setupFeeTotal = 0;
  $scope.totalRevenue = 0;
  $scope.revenueCommission = 0;
  $scope.totalCommissions = 0;
    mainService.getUser().then(function(user){
      $scope.user = user;
      $scope.id = user.user_id;

    commissionService.salesThisWeek($scope.id).then(function(sales){
      $scope.sales = sales;
      for(var i = 0; i <$scope.sales.length; i++){
        $scope.setupFeeTotal += Number($scope.sales[i].setup_fee);
        $scope.totalRevenue += Number($scope.sales[i].amount);
      }
      $scope.setupFeeTotal = $scope.setupFeeTotal.toFixed(2);
      $scope.totalRevenue = $scope.totalRevenue.toFixed(2);
      console.log($scope.sales);
      $scope.setupFeeCommission = (0.25 * $scope.setupFeeTotal).toFixed(2);
      $scope.adjustedRevenue = $scope.totalRevenue - $scope.setupFeeTotal;
            if($scope.totalRevenue < 3000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.05).toFixed(2);
            }
            if($scope.totalRevenue >= 3000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.06).toFixed(2);
            }
            if($scope.totalRevenue >= 3500){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.07).toFixed(2);
            }
            if($scope.totalRevenue >= 4000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.08).toFixed(2);
            }
            if($scope.totalRevenue >= 4500){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.09).toFixed(2);
            }
            if($scope.totalRevenue >= 5000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.10).toFixed(2);
            }
            if($scope.totalRevenue >= 6000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.11).toFixed(2);
            }
            if($scope.totalRevenue >= 7000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.12).toFixed(2);
            }
            if($scope.totalRevenue >= 8000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.15).toFixed(2);
            }
      $scope.totalCommissions = (Number($scope.revenueCommission) + Number($scope.setupFeeCommission)).toFixed(2);
      });
    });

  // $scope.setupFeeCommission = 0.25 * Number($scope.setupFeeTotal);

  // $scope.example = $scope.sales[3].setup_fee;
  // $scope.extractSetupFee = function(){
  //   for(var i = 0; i <$scope.sales.length; i++){
  //     $scope.setupFeeTotal += Number($scope.sales[i].setup_fee);
  //   }
  // };
  // $scope.extractSetupFee();


});
