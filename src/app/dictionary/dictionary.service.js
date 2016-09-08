(function(app) {
  'use strict';

  app.service('dictionaries', function($q, $http, appConfig) {

    angular.extend(this, {
      listAll: function() {
        return $http.get(appConfig.apiUrl + '/dictionaries').then(function(response) {
          return response.data;
        });
      },

      loadByKey: function(key) {
        return $http.get(appConfig.apiUrl + '/dictionaries/' + key).then(function(response) {
          return response.data;
        });
      },

      itemsByKey: function(key, offset, max, q) {
        return $http.get(appConfig.apiUrl + '/dictionaries/' + key + '/items', {params: {offset: offset, max: max, q: q}}).then(function(response) {
          return response.data;
        });
      },

      countItemsByKey: function(key) {
        return $http.get(appConfig.apiUrl + '/dictionaries/' + key + '/count').then(function(response) {
          return response.data;
        });
      },

      addItem: function(key, item) {
        return $http.post(appConfig.apiUrl + '/dictionaries/' + key + '/items', {data: item}).then(function(response) {
          return response.data;
        });
      },

      loadItem: function(id) {
        return $http.get(appConfig.apiUrl + '/dictionaries/items/' + id).then(function(response) {
          return response.data;
        });
      }
    });
  });

} (angular.module('festima')));
