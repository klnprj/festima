(function(app) {
  'use strict';

  app.service('buildings', ['$http', 'appConfig', function($http, appConfig) {
    angular.extend(this, {
      list: function(offset, limit) {
        return $http.get(appConfig.apiUrl + '/buildings', {params: {offset: offset, max: limit}}).then(function(resp) {
          return resp.data;
        });
      }
    });
  }]);

}(angular.module('festima')));
