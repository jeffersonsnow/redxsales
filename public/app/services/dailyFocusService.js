angular.module('app').service('dailyFocusService', function($http){
  this.getAllFocuses = function(id){
    console.log("id in service", id);
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/allfocuses/' + id
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };


});
