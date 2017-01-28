angular.module('app').controller('mainCtrl', function($scope, mainService, $http, $state){
  $scope.test = 'angular is working';
  // $scope.formModel = {};
  // $scope.saleModel = {};
  $scope.dailyRevenue = 0;
  $scope.totalDailySales = 0;
  $scope.dollarPerSale = 0;
  $scope.salesByReps = [];

  $scope.getUser = mainService.getUser().then(function(user){
    $scope.user = user;
    mainService.getCurrentFocus($scope.user.user_id).then(function(currentFocus){
      $scope.currentFocus = currentFocus[0];
    });

  });

  mainService.getAllUsers().then(function(users){
    $scope.users = users;


  });

  mainService.salesToday().then(function(dailysales){
    $scope.dailysales = dailysales;



    for (let i = 0; i < dailysales.length; i++) {
      let found = false;
      for (let j = 0; j < $scope.salesByReps.length; j++) {
        if ($scope.salesByReps[j].id === dailysales[i].user_id) {
          $scope.salesByReps[j].sales.push(dailysales[i].amount);
          found = true;
        }
      }
      if (!found) {
        $scope.salesByReps.push({id: dailysales[i].user_id, sales: [dailysales[i].amount]});
      }
    }
    console.log($scope.salesByReps);
    for(let i = 0; i < $scope.salesByReps.length; i++){
      $scope.salesByReps[i].total = $scope.salesByReps[i].sales.reduce((a, b) => Number(a) + Number(b), 0);
      $scope.salesByReps[i].total = ($scope.salesByReps[i].total).toFixed(2);
      $scope.salesByReps[i].totalSales = $scope.salesByReps[i].sales.length;
      $scope.salesByReps[i].personalDollarPerSale = $scope.salesByReps[i].total / $scope.salesByReps[i].totalSales;
      $scope.salesByReps[i].personalDollarPerSale = ($scope.salesByReps[i].personalDollarPerSale).toFixed(2);
    }



    for(let i = 0; i <$scope.dailysales.length; i++){
      $scope.dailyRevenue += Number($scope.dailysales[i].amount);
      $scope.totalDailySales++;
    }
    $scope.dailyRevenue = ($scope.dailyRevenue).toFixed(2);
    // $scope.dollarPerSale = Number($scope.dailyRevenue) / Number($scope.totalDailySales);
    $scope.dailyRevenue > 0 ? $scope.dollarPerSale = Number($scope.dailyRevenue) / Number($scope.totalDailySales) : 0;

    $scope.dollarPerSale = ($scope.dollarPerSale).toFixed(2);

  });





});
