(function(app) {
  'use strict';

  app.service('addresses', function($http, appConfig) {

    angular.extend(this, {
      listWithinRadius: function(latlng, radius) {

        return $http.get(appConfig.apiUrl + '/locations', {params: {latlng: latlng, radius: radius}}).then(
          function(response) {
            return response.data;
          }
        );
      }

    });
  });
}) (angular.module('festima'));
