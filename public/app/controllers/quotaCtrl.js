angular.module('app').controller('quotaCtrl', function($scope, quotaService, mainService){
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

  quotaService.getQuota().then((quota) => {
      $scope.quota = quota[0];

  mainService.getUser().then(function(user){
        $scope.user = user;
        $scope.id = user.user_id;

    quotaService.getMonthlyTotal($scope.user.user_id).then(function(sales){
        $scope.sales = sales;
        console.log(sales);
        for(var i = 0; i <$scope.sales.length; i++){
          $scope.monthlyTotal += Number($scope.sales[i].amount);
        }
         $scope.monthlyTotal = $scope.monthlyTotal.toFixed(2);

         $scope.quotaPercent = Number($scope.monthlyTotal) / Number($scope.quota.quota_amount);
         $scope.quotaPercent = (100 * $scope.quotaPercent).toFixed(0);
         for(let i = 0; i < $scope.sales.length; i++){
           $scope.totalSales++;
           $scope.expiredsTotal += Number($scope.sales[i].expireds);
           $scope.fsbosTotal += Number($scope.sales[i].fsbos);
           $scope.pfcsTotal += Number($scope.sales[i].preforeclosures);
           $scope.frbosTotal += Number($scope.sales[i].frbos);
           $scope.stormTotal += Number($scope.sales[i].storm);
           $scope.geoTotal += Number($scope.sales[i].geoleads);
           $scope.multilineTotal += Number($scope.sales[i].multiline);
         }
          $scope.monthlyDollarPerSale = $scope.monthlyTotal / $scope.totalSales;
          $scope.monthlyDollarPerSale = ($scope.monthlyDollarPerSale).toFixed(2);
      });
    });
  });



});
