angular.module('app').service('loginService', function($http){
  this.checkAuthentication = function(){
    return $http({
      method: "GET",
      url: "http://localhost:3000/api/authentication"
    }).then(function(response){
      console.log('From Service');
      if(response.status === 200){
        return response.data;
      }
    });
  };
  this.getUser = function(){
    return $http.get('/me');
  };

});
