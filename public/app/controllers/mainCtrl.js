angular.module('app').controller('mainCtrl', function($scope, mainService, $http, $state){
  $scope.test = 'angular is working';
  $scope.formModel = {};
  $scope.saleModel = {};

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
      console.log(currentFocus);
    });
    // mainService.user.name = user.name;
  });

  mainService.salesToday().then(function(dailysales){
    $scope.dailysales = dailysales;
  });


});
