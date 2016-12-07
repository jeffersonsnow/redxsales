'use strict';

angular.module('app').controller('quotaCtrl', ["$scope", "quotaService", "mainService", function ($scope, quotaService, mainService) {
  $scope.quotatest = "quota is connected to controller";
  $scope.monthlyTotal = 0;
  $scope.quotaPercent = 0;
  $scope.monthlyDollarPerSale = 0;
  $scope.totalSales = 0;
  $scope.expiredsTotal = 0;
  $scope.fsbosTotal = 0;
  $scope.pfcsTotal = 0;
  $scope.frbosTotal = 0;
  $scope.stormTotal = 0;
  $scope.onyxTotal = 0;
  $scope.geoTotal = 0;
  $scope.multilineTotal = 0;
  $scope.totalProductCount = 0;
  $scope.productsPerSale = 0;

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

        $scope.quotaPercent = Number($scope.monthlyTotal) / Number($scope.quota.quota_amount);
        $scope.quotaPercent = (100 * $scope.quotaPercent).toFixed(0);
        for (var _i = 0; _i < $scope.sales.length; _i++) {
          $scope.totalSales++;
          $scope.expiredsTotal += Number($scope.sales[_i].expireds);
          $scope.fsbosTotal += Number($scope.sales[_i].fsbos);
          $scope.pfcsTotal += Number($scope.sales[_i].preforeclosures);
          $scope.frbosTotal += Number($scope.sales[_i].frbos);
          $scope.stormTotal += Number($scope.sales[_i].storm);
          $scope.onyxTotal += Number($scope.sales[_i].onyx);
          $scope.geoTotal += Number($scope.sales[_i].geoleads);
          $scope.multilineTotal += Number($scope.sales[_i].multiline);
        }
        $scope.monthlyDollarPerSale = $scope.monthlyTotal / $scope.totalSales;
        $scope.monthlyDollarPerSale = $scope.monthlyDollarPerSale.toFixed(2);
        // $scope.totalProductCount
      });
    });
  });
}]);