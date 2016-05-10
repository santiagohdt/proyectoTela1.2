angular.module('starter')
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('registrarDispositivos', {
      url: '/registrarDispositivos',
      templateUrl: 'templates/registrarDispositivos.html',
      controller: 'RegistrarDispositivosCtrl'
  });

  $urlRouterProvider.otherwise('/registrarDispositivos');
})