(function(app) {
  'use strict';

  app.service('addresses', function($http, appConfig) {

    angular.extend(this, {
      listWithinRadius: function(latlng, radius) {

        return this.searchAddresses({latlng: latlng, radius: radius}, {});
      },

      searchAddresses: function(location, filters) {
        return $http.get(appConfig.apiUrl + '/locations', {params: {latlng: location.latlng, radius: location.radius,
          authorId: filters.authorId, status: filters.status, 'from.lastUpdated': filters.lastUpdatedFrom, q: filters.q, dealerId: filters.dealerId}}).then(
          function(response) {
            return response.data;
          }
        );
      }
    });
  });
}) (angular.module('festima'));
