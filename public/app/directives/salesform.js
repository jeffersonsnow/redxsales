angular.module('app').directive('salesForm', function(){
  return {
      templateUrl:'../../assets/views/salesform.html',
      restrict: 'EA',
      scope: {

      },
      controller: function($scope, mainService, $http, $state){
        $scope.saleModel = {};
        mainService.getUser().then(function(user){
          $scope.user = user;
          console.log('is you working', user);
      });

      $scope.submitSale = function(){
        $scope.saleModel.time = new Date();
          $scope.saleModel.rep = $scope.user.name;
            $scope.saleModel.user_id = $scope.user.user_id;
            swal("Sale Logged!", "Keep on Keeping on!", "success");
              setTimeout(function(){
                  $state.reload();
              }, 1000);

              // $state.reload();
                console.log($scope.saleModel);
                  return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/api/sales',
                    data: $scope.saleModel
                  });
              };
    }
  };
});
