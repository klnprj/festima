(function() {
  'use strict';

  angular
    .module('test')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'app/main/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/building/:buildingId', {
        templateUrl: 'app/main/building.html',
        controller: 'BuildingCtrl',
        controllerAs: 'building'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
