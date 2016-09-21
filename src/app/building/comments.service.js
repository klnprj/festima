(function(app) {
  'use strict';

  app.service('comments', ['$http', 'appConfig', function($http, appConfig) {
    angular.extend(this, {
      listAllByBuilding: function(buildingId) {
        return $http.get(appConfig.apiUrl + '/buildings/' + buildingId + '/comments').then(function(response) {
          return response.data;
        });
      },

      createComment: function(buildingId, commentData) {
        return $http.post(appConfig.apiUrl + '/buildings/' + buildingId + '/comments', commentData).then(function(response) {
          return response.data;
        });
      }
    });
  }]);

} (angular.module('festima')));
