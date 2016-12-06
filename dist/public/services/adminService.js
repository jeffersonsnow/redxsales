'use strict';

angular.module('app').service('adminService', ["$http", function ($http) {

  this.postQuota = function (quotaModel) {
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/api/quota',
      data: quotaModel
    });
  };
}]);