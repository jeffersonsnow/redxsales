angular.module('app').controller('mainCtrl', function($scope, mainService, $http){
  $scope.test = 'angular is working';
  $scope.formModel = {};

  $scope.submitFocus = function(){
    $scope.formModel.time = new Date();
    console.log('submitted!');
    console.log($scope.formModel);
    // $http.post("postgres://Snow@localhost/redxsalesteam")
    return $http({
       method: 'POST',
       url: 'http://localhost:3000/api/dailyfocus',
       data: $scope.formModel

     });
  };
  $scope.getCurrentFocus = mainService.getCurrentFocus().then(function(currentFocus){
    $scope.currentFocus = currentFocus[0];
    console.log(currentFocus);
  });
  $scope.showForm = true;

  $scope.getUser = mainService.getUser().then(function(user){
    $scope.user = user;
    // mainService.user.name = user.name;
  });



});
