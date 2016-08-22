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
        templateUrl: 'app/building/building-show.html',
        controller: 'BuildingShowController',
        controllerAs: 'buildingVm'
      })
      .when('/building/edit/:buildingId', {
        templateUrl: 'app/building/building-edit.html',
        controller: 'BuildingEditController',
        controllerAs: 'vm'
      })
      .when('/building/create', {
        templateUrl: 'app/building/building-create.html',
        controller: 'BuildingCreateController',
        controllerAs: 'vm'
      })
      .when('/address/list', {
        templateUrl: 'app/address/address-list.html',
        controller: 'AddressListController',
        controllerAs: 'vm'
      })
      .when('/dictionaries/list', {
        templateUrl: 'app/dictionary/dictionary-list.html',
        controller: 'DictionaryListController',
        controllerAs: 'vm'
      })
      .when('/dictionaries/:key', {
        templateUrl: 'app/dictionary/dictionary-show.html',
        controller: 'DictionaryShowController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
