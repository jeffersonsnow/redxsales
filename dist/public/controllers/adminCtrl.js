'use strict';

angular.module('app').controller('adminCtrl', ["$scope", "mainService", "adminService", "quotaService", "$state", function ($scope, mainService, adminService, quotaService, $state) {
  $scope.admintest = "Admin is connected to controller.";
  $scope.quotaModel = {};
  $scope.showQuotaTab = false;
  $scope.monthlyTeamTotal = 0;
  $scope.teamDollarPerSale = 0;
  $scope.salesByReps = [];

  mainService.getAllUsers().then(function (users) {
    $scope.users = users;
  });

  quotaService.getQuota().then(function (quota) {
    $scope.quota = quota[0];
    console.log($scope.quota);

    adminService.getSalesThisMonth().then(function (allMonthlySales) {
      $scope.allMonthlySales = allMonthlySales;
      console.log($scope.allMonthlySales);

      for (var i = 0; i < $scope.allMonthlySales.length; i++) {
        $scope.monthlyTeamTotal += Number($scope.allMonthlySales[i].amount);
      }
      //start of monster loop

      for (var _i = 0; _i < allMonthlySales.length; _i++) {
        var found = false;
        for (var j = 0; j < $scope.salesByReps.length; j++) {
          if ($scope.salesByReps[j].id === allMonthlySales[_i].user_id) {
            $scope.salesByReps[j].sales.push(allMonthlySales[_i].amount);
            found = true;
          }
        }
        if (!found) {
          $scope.salesByReps.push({ id: allMonthlySales[_i].user_id, sales: [allMonthlySales[_i].amount] });
        }
      }
      console.log($scope.salesByReps);
      for (var _i2 = 0; _i2 < $scope.salesByReps.length; _i2++) {
        $scope.salesByReps[_i2].total = $scope.salesByReps[_i2].sales.reduce(function (a, b) {
          return Number(a) + Number(b);
        }, 0);
        $scope.salesByReps[_i2].total = $scope.salesByReps[_i2].total.toFixed(2);
      }
      console.log($scope.salesByReps);
      //not part of monthly arrays
      $scope.monthlyTeamTotal = $scope.monthlyTeamTotal.toFixed(2);
    });
  });

  $scope.submitQuota = function () {
    $scope.quotaModel.quota_time = new Date();
    $state.reload();
    adminService.postQuota($scope.quotaModel);
  };
}]);