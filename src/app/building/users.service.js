(function(app) {
  'use strict';

  app.service('users', UsersService);

  function UsersService($http, appConfig) {
    angular.extend(this, {
      list: function() {
        return $http.get(appConfig.apiUrl + '/users').then(function(response) {
          return response.data;
        });
      }
    });
  }

}(angular.module('festima')));
