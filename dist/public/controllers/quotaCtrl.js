'use strict';

angular.module('app').controller('quotaCtrl', ["$scope", "quotaService", "mainService", function ($scope, quotaService, mainService) {
  $scope.quotatest = "quota is connected to controller";
  $scope.monthlyTotal = 0;
  $scope.quotaPercent = 0;

  quotaService.getQuota().then(function (quota) {
    $scope.quota = quota[0];

    mainService.getUser().then(function (user) {
      $scope.user = user;
      $scope.id = user.user_id;

      quotaService.getMonthlyTotal($scope.user.user_id).then(function (sales) {
        $scope.sales = sales;
        console.log(sales);
        for (var i = 0; i < $scope.sales.length; i++) {
          $scope.monthlyTotal += Number($scope.sales[i].amount);
        }
        $scope.monthlyTotal = $scope.monthlyTotal.toFixed(2);
        console.log('numbers', $scope.monthlyTotal, $scope.quota);
        $scope.quotaPercent = Number($scope.monthlyTotal) / Number($scope.quota.quota_amount);
        $scope.quotaPercent = (100 * $scope.quotaPercent).toFixed(0);
      });
    });
  });
}]);