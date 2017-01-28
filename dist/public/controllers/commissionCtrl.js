'use strict';

angular.module('app').controller('commissionCtrl', ["$scope", "mainService", "commissionService", function ($scope, mainService, commissionService) {
  $scope.testing = "Comms page connected to controller";
  $scope.weeklyDollarPerSale = 0;
  $scope.totalSales = 0;
  $scope.setupFeeTotal = 0;
  $scope.totalRevenue = 0;
  $scope.revenueCommission = 0;
  $scope.totalCommissions = 0;
  $scope.commissionPercentage = 5;
  $scope.graphPercent = 100 * ($scope.commissionPercentage / 15);
  var updatecommissionbar = function updatecommissionbar() {
    console.log($scope.commissionPercentage);
    if ($scope.commissionPercentage <= 5) {
      $scope.class = "progress-bar progress-bar-danger";
    }
    if ($scope.commissionPercentage > 5 && $scope.commissionPercentage < 10) {
      $scope.class = "progress-bar progress-bar-warning";
    }
    if ($scope.commissionPercentage >= 10 && $scope.commissionPercentage <= 14) {
      $scope.class = "progress-bar progress-bar-success";
    }
    if ($scope.commissionPercentage > 14) {
      $scope.class = "progress-bar progress-bar-primary";
    }
  };

  mainService.getUser().then(function (user) {
    $scope.user = user;
    $scope.id = user.user_id;

    commissionService.salesThisWeek($scope.id).then(function (sales) {
      $scope.sales = sales;
      for (var i = 0; i < $scope.sales.length; i++) {
        $scope.setupFeeTotal += Number($scope.sales[i].setup_fee);
        $scope.totalRevenue += Number($scope.sales[i].amount);
        $scope.totalSales++;
      }
      $scope.setupFeeTotal = $scope.setupFeeTotal.toFixed(2);
      $scope.totalRevenue = $scope.totalRevenue.toFixed(2);
      console.log($scope.sales);
      $scope.setupFeeCommission = (0.25 * $scope.setupFeeTotal).toFixed(2);
      $scope.adjustedRevenue = $scope.totalRevenue - $scope.setupFeeTotal;
      if ($scope.totalRevenue < 3000) {
        $scope.commissionPercentage = 5;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.05).toFixed(2);
      }
      if ($scope.totalRevenue >= 3000) {
        $scope.commissionPercentage += 1;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.06).toFixed(2);
      }
      if ($scope.totalRevenue >= 3500) {
        $scope.commissionPercentage += 1;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.07).toFixed(2);
      }
      if ($scope.totalRevenue >= 4000) {
        $scope.commissionPercentage += 1;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.08).toFixed(2);
      }
      if ($scope.totalRevenue >= 4500) {
        $scope.commissionPercentage += 1;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.09).toFixed(2);
      }
      if ($scope.totalRevenue >= 5000) {
        $scope.commissionPercentage += 1;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.10).toFixed(2);
      }
      if ($scope.totalRevenue >= 6000) {
        $scope.commissionPercentage += 1;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.11).toFixed(2);
      }
      if ($scope.totalRevenue >= 7000) {
        $scope.commissionPercentage += 1;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.12).toFixed(2);
      }
      if ($scope.totalRevenue >= 8000) {
        $scope.commissionPercentage += 3;
        $scope.revenueCommission = ($scope.adjustedRevenue * 0.15).toFixed(2);
      }
      $scope.totalCommissions = (Number($scope.revenueCommission) + Number($scope.setupFeeCommission)).toFixed(2);
      console.log($scope.sales);
      $scope.totalRevenue > 0 ? $scope.weeklyDollarPerSale = Number($scope.totalRevenue) / Number($scope.totalSales) : 0;
      $scope.weeklyDollarPerSale = $scope.weeklyDollarPerSale.toFixed(2);
      $scope.graphPercent = 100 * ($scope.commissionPercentage / 15);
      $scope.graphPercent = $scope.graphPercent.toFixed(0);
      updatecommissionbar();
    });
  });
}]);