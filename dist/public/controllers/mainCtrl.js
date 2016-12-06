'use strict';

angular.module('app').controller('mainCtrl', ["$scope", "mainService", "$http", "$state", function ($scope, mainService, $http, $state) {
  $scope.test = 'angular is working';
  $scope.formModel = {};
  $scope.saleModel = {};
  $scope.dailyRevenue = 0;
  $scope.totalDailySales = 0;
  $scope.dollarPerSale = 0;
  $scope.salesByReps = [];

  $scope.submitFocus = function () {
    $scope.formModel.time = new Date();
    $scope.formModel.user_id = $scope.user.user_id;
    $state.reload();
    console.log('submitted!');
    console.log($scope.formModel);
    // $http.post("postgres://Snow@localhost/redxsalesteam")
    // mainService.submitFocus($scope.formModel)
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/api/dailyfocus',
      data: $scope.formModel
    });
  };

  $scope.submitSale = function () {
    $scope.saleModel.time = new Date();
    $scope.saleModel.rep = $scope.user.name;
    $scope.saleModel.user_id = $scope.user.user_id;
    $state.reload();
    console.log($scope.saleModel);
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/api/sales',
      data: $scope.saleModel
    });
  };

  // $scope.getCurrentFocus =
  // mainService.getCurrentFocus($scope.user.user_id).then(function(currentFocus){
  //   $scope.currentFocus = currentFocus[0];
  //   console.log(currentFocus);
  // });

  $scope.showForm = false;
  $scope.showSaleTab = false;

  $scope.getUser = mainService.getUser().then(function (user) {
    $scope.user = user;
    mainService.getCurrentFocus($scope.user.user_id).then(function (currentFocus) {
      $scope.currentFocus = currentFocus[0];
    });
    // mainService.user.name = user.name;
  });

  mainService.getAllUsers().then(function (users) {
    $scope.users = users;
  });

  mainService.salesToday().then(function (dailysales) {
    $scope.dailysales = dailysales;

    for (var _i = 0; _i < dailysales.length; _i++) {
      var found = false;
      for (var j = 0; j < $scope.salesByReps.length; j++) {
        if ($scope.salesByReps[j].id === dailysales[_i].user_id) {
          $scope.salesByReps[j].sales.push(dailysales[_i].amount);
          found = true;
        }
      }
      if (!found) {
        $scope.salesByReps.push({ id: dailysales[_i].user_id, sales: [dailysales[_i].amount] });
      }
    }
    console.log($scope.salesByReps);
    for (var _i2 = 0; _i2 < $scope.salesByReps.length; _i2++) {
      $scope.salesByReps[_i2].total = $scope.salesByReps[_i2].sales.reduce(function (a, b) {
        return Number(a) + Number(b);
      }, 0);
    }

    // for (let i = 0; i < dailysales.length; i++) {
    //   let found = false;
    //   for (let j = 0; j < arr.length; j++) {
    //     if (arr[j].id === dailysales[i].user_id) {
    //       arr[j].sales.push(dailysales[i].amount);
    //       found = true;
    //     }
    //   }
    //   if (!found) {
    //     arr.push({id: dailysales[i].user_id, sales: [dailysales[i].amount]});
    //   }
    // }
    // console.log(arr);

    for (var i = 0; i < $scope.dailysales.length; i++) {
      $scope.dailyRevenue += Number($scope.dailysales[i].amount);
      $scope.totalDailySales++;
    }
    $scope.dailyRevenue = $scope.dailyRevenue.toFixed(2);
    $scope.dollarPerSale = Number($scope.dailyRevenue) / Number($scope.totalDailySales);
    $scope.dollarPerSale = $scope.dollarPerSale.toFixed(2);
  });

  $scope.gridOpts = {
    data: 'dailysales',
    resizable: 'true',
    columnDefs: [{ field: 'amount', displayName: 'Sale' }]
  };
}]);