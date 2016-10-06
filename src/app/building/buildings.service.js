(function(app) {
  'use strict';

  app.service('buildings', ['$http', 'appConfig', function($http, appConfig) {
    angular.extend(this, {
      list: function(offset, limit, q) {
        return $http.get(appConfig.apiUrl + '/buildings', {params: {offset: offset, max: limit, q: q}}).then(function(resp) {
          return resp.data;
        });
      }
    });
  }]);

}(angular.module('festima')));
