(function(app) {
  'use strict';

  app.service('buildings', ['$http', 'appConfig', function($http, appConfig) {
    angular.extend(this, {
      list: function(offset, limit, q, authorId, status, lastUpdatedFrom, dealerId) {
        var params = {offset: offset, max: limit, q: q, authorId: authorId, status: status, 'from.lastUpdated': lastUpdatedFrom, dealerId: dealerId};
        return $http.get(appConfig.apiUrl + '/buildings', {params: params}).then(function(resp) {
          return resp.data;
        });
      },

      get: function(id) {
        return $http.get(appConfig.apiUrl + '/buildings/' + id).then(function(response) {
          return response.data;
        });
      },

      update: function(building) {
        building.contacts = []; // do not resave
        return $http.put(appConfig.apiUrl + '/buildings/' + building.id, building).then(function(response) {
          return response.data;
        });
      }
    });
  }]);

}(angular.module('festima')));
