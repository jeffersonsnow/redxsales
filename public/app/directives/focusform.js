angular.module('app').directive('focusForm', function(){
  return {
    templateUrl: '../../assets/views/focusform.html',
    restrict: 'EA',
    controller: function($scope, mainService, $http, $state){
      $scope.formModel = {};
      mainService.getUser().then(function(user){
        $scope.user = user;
        console.log('is you working', user);
    });
    $scope.submitFocus = function(){
            $scope.formModel.time = new Date();
            $scope.formModel.user_id = $scope.user.user_id;
            swal("Focus Set!", "Go, Man. Go!", "success");
            setTimeout(function(){
                $state.reload();
            }, 1500);
            // $state.reload();
            // $scope.$digest();
            return $http({
               method: 'POST',
               url: '/api/dailyfocus',
               data: $scope.formModel
             });
           };


    }


  };



});
