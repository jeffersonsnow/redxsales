angular.module('app').controller('mainCtrl', function($scope, mainService, $http, $state){
  $scope.test = 'angular is working';
  $scope.formModel = {};
  $scope.saleModel = {};
  $scope.dailyRevenue = 0;
  $scope.totalDailySales = 0;
  $scope.dollarPerSale = 0;
  $scope.salesByReps = [];



  $scope.submitFocus = function(){
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

  $scope.submitSale = function(){
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

  $scope.getUser = mainService.getUser().then(function(user){
    $scope.user = user;
    mainService.getCurrentFocus($scope.user.user_id).then(function(currentFocus){
      $scope.currentFocus = currentFocus[0];
    });
    // mainService.user.name = user.name;
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

    for(var i = 0; i <$scope.dailysales.length; i++){
      $scope.dailyRevenue += Number($scope.dailysales[i].amount);
      $scope.totalDailySales++;
    }
    $scope.dailyRevenue = ($scope.dailyRevenue).toFixed(2);
    $scope.dollarPerSale = Number($scope.dailyRevenue) / Number($scope.totalDailySales);
    $scope.dollarPerSale = ($scope.dollarPerSale).toFixed(2);

  });




  $scope.gridOpts = {
    data: 'dailysales',
    resizable: 'true',
    columnDefs: [

    {field: 'amount', displayName: 'Sale'},

  ],
  };




});
