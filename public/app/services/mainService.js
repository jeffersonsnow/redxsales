angular.module('app').service('mainService', function($http){
//   this.submitFocus = function() {
//   return $http({
//     method: 'POST',
//     url: 'http://localhost:3000/dailyfocus',
//     data: formModel
//
//   });
// };

  this.getCurrentFocus = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/dailyfocus'
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };
});
