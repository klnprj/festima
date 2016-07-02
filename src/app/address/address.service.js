(function(app) {
  'use strict';

  app.service('addresses', function($q, $http, appConfig) {

    angular.extend(this, {
      listWithinRadius: function(latlng, radius) {
        var deferred = $q.defer();

        $http.get(appConfig.apiUrl + '/buildings', {params: {latlng: latlng, radius: radius}}).then(
          function(response) {
            console.log('Found addresses:', response.data);
            deferred.resolve(response.data);
          },
          function() {
            deferred.reject();
          }
        );
        // deferred.resolve([{name: 'one'}, {name: 'two'}]);

        return deferred.promise;
      }

    });
  });
}) (angular.module('festima'));
