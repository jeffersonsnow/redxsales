'use strict';

angular.module('app').directive('focusForm', function () {
  return {
    templateUrl: '../../assets/views/focusform.html',
    restrict: 'EA',
    controller: ["$scope", "mainService", "$http", "$state", function ($scope, mainService, $http, $state) {
      $scope.formModel = {};
      mainService.getUser().then(function (user) {
        $scope.user = user;
        console.log('is you working', user);
      });
      $scope.submitFocus = function () {
        $scope.formModel.time = new Date();
        $scope.formModel.user_id = $scope.user.user_id;
        swal("Focus Set!", "Go, Man. Go!", "success");
        $state.reload();
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/dailyfocus',
          data: $scope.formModel
        });
      };
    }]

  };
});