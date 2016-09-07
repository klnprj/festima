(function() {
  'use strict';

  angular
    .module('festima')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('private',{
        url: '',
        abstract: true,
        views: {
          app: {templateUrl: 'app/layouts/private-layout.html'}
        },
        resolve: {
          loggedin: function(session) { return session.checkLoggedIn(); }
        }
      })
      .state("private.logout", {
        url: "/logout",
        resolve: {
          loggedout: function(session) { return session.logout(); }
        }
      })
      .state("private.main", {
        url: "/",
        views: {
          'container@private': { templateUrl: "app/main/main.html", controller: 'MainController', controllerAs: 'main' }
        }
      })
      .state("private.buildinglist", {
        url: "/building/list",
        views: {
          'container@private': {templateUrl: 'app/building/building-list.html', controller: 'BuildingListController', controllerAs: 'vm'}
        }
      })
      .state("private.buildingshow", {
        url: "/building/show/:buildingId",
        views: {
          'container@private': { templateUrl: 'app/building/building-show.html', controller: 'BuildingShowController', controllerAs: 'buildingVm' }
        }
      })
      .state("private.buildingedit", {
        url: "/building/edit/:buildingId",
        views: {
          'container@private': { templateUrl: 'app/building/building-edit.html', controller: 'BuildingEditController', controllerAs: 'vm' }
        }
      })
      .state("private.buildingcreate", {
        url: "/building/create",
        views: {
          'container@private': { templateUrl: 'app/building/building-create.html', controller: 'BuildingCreateController', controllerAs: 'vm' }
        }
      })
      .state("private.addresslist", {
        url: "/address/list",
        views: {
          'container@private': { templateUrl: 'app/address/address-list.html', controller: 'AddressListController', controllerAs: 'vm' }
        }
      })
      .state("private.dictionarieslist", {
        url: "/dictionaries/list",
        views: {
          'container@private': { templateUrl: 'app/dictionary/dictionary-list.html', controller: 'DictionaryListController', controllerAs: 'vm' }
        }
      })
      .state("private.dictionaryshow", {
        url: "/dictionaries/:key",
        views: {
          'container@private': { templateUrl: 'app/dictionary/dictionary-show.html', controller: 'DictionaryShowController', controllerAs: 'vm' }
        }
      })
      .state("public", {
        url: '',
        abstract: true,
        views: {
          app: {templateUrl: 'app/layouts/public-layout.html'}
        }
      })
      .state("public.login", {
        url: "/login",
        views: {
          'container@public': {templateUrl: "app/login/login.html", controller: "LoginController", controllerAs: 'vm'}
        },
        resolve: {
          skipLoggedIn: function(session) { return session.skipLoggedIn(); }
        }
      })
      .state("public.about", {
        url: "/about",
        views: {
          'container@public': {templateUrl: 'app/main/about.html', controller: 'AboutController', controllerAs: 'about'}
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
