angular.module('app').controller('adminCtrl', function($scope, mainService, adminService, quotaService, $state){
  $scope.admintest = "Admin is connected to controller.";
  $scope.quotaModel = {};
  $scope.showQuotaTab = false;
  $scope.monthlyTeamTotal = 0;
  $scope.teamDollarPerSale = 0;
  $scope.salesByReps = [];

  mainService.getAllUsers().then(function(users){
    $scope.users = users;
  });

  quotaService.getQuota().then(function(quota){
      $scope.quota = quota[0];
      console.log($scope.quota);

    adminService.getSalesThisMonth().then(function(allMonthlySales){
      $scope.allMonthlySales = allMonthlySales;
      console.log($scope.allMonthlySales);

        for(let i = 0; i < $scope.allMonthlySales.length; i++){
          $scope.monthlyTeamTotal += Number($scope.allMonthlySales[i].amount);
        }
        //start of monster loop

        for (let i = 0; i < allMonthlySales.length; i++) {
          let found = false;
          for (let j = 0; j < $scope.salesByReps.length; j++) {
            if ($scope.salesByReps[j].id === allMonthlySales[i].user_id) {
              $scope.salesByReps[j].sales.push(allMonthlySales[i].amount);
              found = true;
            }
          }
          if (!found) {
            $scope.salesByReps.push({id: allMonthlySales[i].user_id, sales: [allMonthlySales[i].amount]});
          }
        }
        console.log($scope.salesByReps);
        for(let i = 0; i < $scope.salesByReps.length; i++){
          $scope.salesByReps[i].total = $scope.salesByReps[i].sales.reduce((a, b) => Number(a) + Number(b), 0);
          $scope.salesByReps[i].total = ($scope.salesByReps[i].total).toFixed(2);
        }
        console.log($scope.salesByReps);
        //not part of monthly arrays
        $scope.monthlyTeamTotal = ($scope.monthlyTeamTotal).toFixed(2);
    });

});


  $scope.submitQuota = function (){
    $scope.quotaModel.quota_time = new Date();
    $state.reload();
    adminService.postQuota($scope.quotaModel);
  };


});
