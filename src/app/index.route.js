(function() {
  'use strict';

  angular
    .module('festima')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/building/list', {
        templateUrl: 'app/building/building-list.html',
        controller: 'BuildingListController',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'app/main/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      })
      .when('/building/show/:buildingId', {
        templateUrl: 'app/building/building.html',
        controller: 'BuildingController',
        controllerAs: 'building'
      })
      .when('/building/edit/:buildingId', {
        templateUrl: 'app/building/building-edit.html',
        controller: 'BuildingEditController',
        controllerAs: 'vm'
      })
      .when('/building/create', {
        templateUrl: 'app/building/building-create.html',
        controller: 'BuildingCreateController',
        controllerAs: 'building'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
