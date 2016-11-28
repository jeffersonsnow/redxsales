angular.module('app').service('dailyFocusService', function($http){
  this.getAllFocuses = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/allfocuses'
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };


});
