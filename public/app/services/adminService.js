angular.module('app').service('adminService', function($http){

  this.postQuota = function(quotaModel){
      return $http({
         method: 'POST',
         url: '/api/quota',
         data: quotaModel
       });
      };

  this.getSalesThisMonth = function(){
    return $http({
      method: 'GET',
      url: '/api/allmonthlysales'
    }).then(function(response){
      console.log(response);
      if(response.status === 200){
        return response.data;
      }
    });
  };


});
