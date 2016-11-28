angular.module('app',['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home',{
      url: '/',
      templateUrl:'./assets/views/home.html',
      controller: 'mainCtrl'
    })
    .state('login',{
      url: '/login',
      templateUrl:'./assets/views/login.html'
    })
    .state('dailyfocus',{
      url: '/dailyfocus',
      templateUrl: './assets/views/dailyfocushistory.html',
      controller: 'dailyfocusCtrl'
    })
    // .state('about',{
    //   url: '/about',
    //   templateUrl: '/views/about.html'
    // })
    // .state('details',{
    //   url:'/details/:id',
    //   templateUrl: '/views/product-details.html',
    //   controller: 'mainCtrl'
    // })

    ;
  $urlRouterProvider
    .otherwise('/');
  });
