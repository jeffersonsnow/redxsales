angular.module('app').controller('dailyfocusCtrl', function($scope, dailyFocusService){
  $scope.getAllFocuses = dailyFocusService.getAllFocuses().then(function(focuses){
    $scope.focuses = focuses[0];
});

});
