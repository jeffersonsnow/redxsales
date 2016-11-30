angular.module('app').service('commissionService', function($http){
  this.salesThisWeek = function(id){
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/weeklysales/' + id
    }).then(function(response){
      console.log(response);
      if(response.status === 200){
        console.log(response);
        return response.data;
      }
    });
  };

});
