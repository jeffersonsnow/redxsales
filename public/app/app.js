angular.module('app',['ui.router', 'ngGrid'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home',{
      url: '/home',
      templateUrl:'./assets/views/home.html',
      controller: 'mainCtrl',
      resolve: {
        check: function(loginService, $state){
          return loginService.checkAuthentication().then(function(response){
            if(response === "Unauthorized"){
              $state.go('login');
              alert("Please login first.");
            } else {
              return response.data;
            }
          });
        }
      }

    })
    .state('login',{
      url: '/',
      templateUrl:'./assets/views/login.html'
    })
    .state('dailyfocus',{
      url: '/dailyfocus',
      templateUrl: './assets/views/dailyfocushistory.html',
      controller: 'dailyFocusCtrl',
      resolve: {
        check: function(loginService, $state){
          return loginService.checkAuthentication().then(function(response){
            if(response === "Unauthorized"){
              $state.go('login');
              alert("Please login first.");
            } else {
              return response.data;
            }
          });
        }
      }

    })
    .state('commissions',{
      url: '/commissions',
      templateUrl: './assets/views/commissions.html',
      controller: 'commissionCtrl'
    })
    // .state('details',{
    //   url:'/details/:id',
    //   templateUrl: '/views/product-details.html',
    //   controller: 'mainCtrl'
    // })

    ;
  $urlRouterProvider
    .otherwise('/');
  });
