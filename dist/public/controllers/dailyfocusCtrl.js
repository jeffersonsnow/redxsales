'use strict';

angular.module('app').controller('dailyFocusCtrl', ["$scope", "dailyFocusService", "commissionService", "mainService", function ($scope, dailyFocusService, commissionService, mainService) {
  $scope.test = "This must be working!";
  // $scope.currentPage = 0;
  // $scope.pageSize = 5;
  // $scope.focusdata = [];

  mainService.getUser().then(function (user) {
    $scope.user = user;
    $scope.id = user.user_id;

    dailyFocusService.getAllFocuses($scope.id).then(function (focuses) {
      $scope.focuses = focuses;
    });
    // mainService.user.name = user.name;
  });

  $scope.gridOpts = {
    data: 'focuses',
    resizable: 'true',
    columnDefs: [{ field: 'focus', displayName: 'Focus' }, { field: 'focus_date | date:"short"', displayName: 'Date' }],
    plugins: [new commissionService.ngGridFlexibleHeightPlugin()]
  };
}]);