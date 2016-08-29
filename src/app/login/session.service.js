(function(app) {
  'use strict';

  app.service('session', function($http, $log, appConfig, OAuth, OAuthToken, spinnerService) {
    var currentUserPromise;

    angular.extend(this, {
      login: function(credentials) {
        var options = {};

        function fetchUser(email) {
          return $http.get(appConfig.apiUrl + '/users', {params: {email: email}}).then(function(response) {
            return response.data[0];
          });
        }

        angular.extend(credentials, {scope: 'read'});

        return OAuth.getAccessToken(credentials, options).then(function(response) {

          currentUserPromise = fetchUser(credentials.username);

        }).catch(function(e) {
          $log.error('Auth error: ', e);
        });
      },

      logout: function() {
        OAuth.revokeToken();
      },

      profile: function() {
        return currentUserPromise;
      },

      isAuthenticated: function() {
        return OAuth.isAuthenticated();
      }
    });
  });

} (angular.module('festima')));
