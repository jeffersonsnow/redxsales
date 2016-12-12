'use strict';

angular.module('app').controller('mainCtrl', ["$scope", "mainService", "$http", "$state", function ($scope, mainService, $http, $state) {
  $scope.test = 'angular is working';
  // $scope.formModel = {};
  // $scope.saleModel = {};
  $scope.dailyRevenue = 0;
  $scope.totalDailySales = 0;
  $scope.dollarPerSale = 0;
  $scope.salesByReps = [];

  $scope.getUser = mainService.getUser().then(function (user) {
    $scope.user = user;
    mainService.getCurrentFocus($scope.user.user_id).then(function (currentFocus) {
      $scope.currentFocus = currentFocus[0];
    });
  });

  mainService.getAllUsers().then(function (users) {
    $scope.users = users;
  });

  mainService.salesToday().then(function (dailysales) {
    $scope.dailysales = dailysales;

    for (var i = 0; i < dailysales.length; i++) {
      var found = false;
      for (var j = 0; j < $scope.salesByReps.length; j++) {
        if ($scope.salesByReps[j].id === dailysales[i].user_id) {
          $scope.salesByReps[j].sales.push(dailysales[i].amount);
          found = true;
        }
      }
      if (!found) {
        $scope.salesByReps.push({ id: dailysales[i].user_id, sales: [dailysales[i].amount] });
      }
    }
    console.log($scope.salesByReps);
    for (var _i = 0; _i < $scope.salesByReps.length; _i++) {
      $scope.salesByReps[_i].total = $scope.salesByReps[_i].sales.reduce(function (a, b) {
        return Number(a) + Number(b);
      }, 0);
      $scope.salesByReps[_i].total = $scope.salesByReps[_i].total.toFixed(2);
      $scope.salesByReps[_i].totalSales = $scope.salesByReps[_i].sales.length;
      $scope.salesByReps[_i].personalDollarPerSale = $scope.salesByReps[_i].total / $scope.salesByReps[_i].totalSales;
      $scope.salesByReps[_i].personalDollarPerSale = $scope.salesByReps[_i].personalDollarPerSale.toFixed(2);
    }

    for (var _i2 = 0; _i2 < $scope.dailysales.length; _i2++) {
      $scope.dailyRevenue += Number($scope.dailysales[_i2].amount);
      $scope.totalDailySales++;
    }
    $scope.dailyRevenue = $scope.dailyRevenue.toFixed(2);
    $scope.dollarPerSale = Number($scope.dailyRevenue) / Number($scope.totalDailySales);
    $scope.dollarPerSale = $scope.dollarPerSale.toFixed(2);
  });
}]);