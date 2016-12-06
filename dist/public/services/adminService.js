'use strict';

angular.module('app').service('adminService', ["$http", function ($http) {

  this.postQuota = function (quotaModel) {
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/api/quota',
      data: quotaModel
    });
  };

  this.getSalesThisMonth = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/allmonthlysales'
    }).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    });
  };
}]);