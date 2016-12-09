angular.module('app').service('quotaService', function($http){
  this.getQuota = function(){
    return $http({
      method: 'GET',
      url: '/api/monthlyquota/',
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };

  this.getMonthlyTotal = function(id){
    console.log(id);
    return $http({
      method: 'GET',
      url: '/api/monthlytotal/' + id
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };

});
