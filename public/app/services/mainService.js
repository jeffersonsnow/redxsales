angular.module('app').service('mainService', function($http){
//   this.submitFocus = function(formModel) {
//   return $http({
//     method: 'POST',
//     url: 'http://localhost:3000/dailyfocus',
//     data: formModel
//
//   });
// };

  this.getCurrentFocus = function(id){
    console.log("id in mainService", id);
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/dailyfocus/' + id
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };

  this.getUser = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/me'
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };
  // this.getUser = function(){
  //   return $http.get('/me');
  // };

  this.user = {};

  this.salesToday = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/dailysales/' 
    }).then(function(response){
      console.log(response);
      if(response.status === 200){
        console.log(response);
        return response.data;
      }
    });
  };

});
