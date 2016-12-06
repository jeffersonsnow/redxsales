'use strict';

angular.module('app').service('dailyFocusService', ["$http", function ($http) {
  this.getAllFocuses = function (id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/allfocuses/' + id
    }).then(function (response) {
      if (response.status === 200) {
        return response.data;
      }
    });
  };
}]);