angular.module('app').controller('dailyFocusCtrl', function($scope, dailyFocusService, mainService){
  $scope.test = "This must be working!";
  mainService.getUser().then(function(user){
    $scope.user = user;
    $scope.id = user.user_id;

    dailyFocusService.getAllFocuses($scope.id).then(function(focuses){
      $scope.focuses = focuses;
  });
    // mainService.user.name = user.name;
  });



});
