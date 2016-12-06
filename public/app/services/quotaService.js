angular.module('app').service('quotaService', function($http){
  this.getQuota = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/monthlyquota/',
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
      url: 'http://localhost:3000/api/monthlytotal/' + id
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }
    });
  };

});
