angular.module('app').controller('dailyFocusCtrl', function($scope, dailyFocusService){
  $scope.test = "This must be working!";
  $scope.getAllFocuses = dailyFocusService.getAllFocuses().then(function(focuses){
    $scope.focuses = focuses;
});

});
