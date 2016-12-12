'use strict';

angular.module('app').directive('salesForm', function () {
  return {
    templateUrl: '../../assets/views/salesform.html',
    restrict: 'EA',
    scope: {},
    controller: ["$scope", "mainService", "$http", "$state", function ($scope, mainService, $http, $state) {
      $scope.saleModel = {};
      mainService.getUser().then(function (user) {
        $scope.user = user;
        // console.log('is you working', user);
      });

      // $scope.submitSale = function(){
      //   $scope.saleModel.time = new Date();
      //     $scope.saleModel.rep = $scope.user.name;
      //       $scope.saleModel.user_id = $scope.user.user_id;
      //       swal("Sale Logged!", "Keep on Keeping on!", "success");
      //         setTimeout(function(){
      //             $state.reload();
      //         }, 3000);
      //
      //         // $state.reload();
      //           // console.log($scope.saleModel);
      //             return $http({
      //               method: 'POST',
      //               url: '/api/sales',
      //               data: $scope.saleModel
      //             });
      //         };

      $scope.submitSale = function () {
        $scope.saleModel.time = new Date();
        console.log($scope.saleModel.time, 'this is the date');
        $scope.saleModel.rep = $scope.user.name;
        $scope.saleModel.user_id = $scope.user.user_id;
        swal("Sale Logged!", "Keep on Keeping on!", "success");
        // setTimeout(function(){
        //     $state.reload();
        // }, 3000);

        // $state.reload();
        console.log($scope.saleModel, 'this is line 44');
        $http({
          method: 'POST',
          url: '/api/sales',
          data: $scope.saleModel
        }).then(function (response) {
          mainService.salesToday().then(function (response) {
            console.log(response, 'salestoday fired?');
            // $scope.dailysales = response.data;
            $state.reload();
          });
          console.log(response, 'this is line 49');
          // $state.reload();
        });
      };
    }]
  };
});