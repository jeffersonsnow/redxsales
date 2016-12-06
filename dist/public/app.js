'use strict';

angular.module('app', ['ui.router', 'ngGrid']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: './assets/views/home.html',
    controller: 'mainCtrl',
    resolve: {
      check: ["loginService", "$state", function (loginService, $state) {
        return loginService.checkAuthentication().then(function (response) {
          if (response === "Unauthorized") {
            $state.go('login');
            alert("Please login first.");
          } else {
            return response.data;
          }
        });
      }]
    }

  }).state('login', {
    url: '/',
    templateUrl: './assets/views/login.html'
  }).state('dailyfocus', {
    url: '/dailyfocus',
    templateUrl: './assets/views/dailyfocushistory.html',
    controller: 'dailyFocusCtrl',
    resolve: {
      check: ["loginService", "$state", function (loginService, $state) {
        return loginService.checkAuthentication().then(function (response) {
          if (response === "Unauthorized") {
            $state.go('login');
            alert("Please login first.");
          } else {
            return response.data;
          }
        });
      }]
    }

  }).state('commissions', {
    url: '/commissions',
    templateUrl: './assets/views/commissions.html',
    controller: 'commissionCtrl',
    resolve: {
      check: ["loginService", "$state", function (loginService, $state) {
        return loginService.checkAuthentication().then(function (response) {
          if (response === "Unauthorized") {
            $state.go('login');
            alert("Please login first.");
          } else {
            return response.data;
          }
        });
      }]
    }
  }).state('quota', {
    url: '/quota',
    templateUrl: '/assets/views/quota.html',
    controller: 'quotaCtrl',
    resolve: {
      check: ["loginService", "$state", function (loginService, $state) {
        return loginService.checkAuthentication().then(function (response) {
          if (response === "Unauthorized") {
            $state.go('login');
            alert("Please login first.");
          } else {
            return response.data;
          }
        });
      }]
    }
  }).state('admin', {
    url: '/admin',
    templateUrl: '/assets/views/admin.html',
    controller: 'adminCtrl'
  });
  $urlRouterProvider.otherwise('/');
}]);