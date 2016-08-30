(function(app) {
  'use strict';

  app.service('session', function($http, $log, $q, $state, $rootScope, $timeout, $cookies, appConfig, OAuth, OAuthToken) {
    var currentUserPromise;
    var userId;

    function fetchUser(email) {
      return $http.get(appConfig.apiUrl + '/users', {params: {email: email}}).then(function(response) {
        return response.data[0];
      });
    }

    // $rootScope.$on('$stateChangeError', function () {
    //   $state.go('public.login');
    // });

    angular.extend(this, {
      login: function(credentials) {
        var options = {};

        angular.extend(credentials, {scope: 'read'});

        return OAuth.getAccessToken(credentials, options).then(function(response) {
          userId = credentials.username;
          currentUserPromise = fetchUser(userId);

        }).catch(function(e) {
          $log.error('Auth error: ', e);
        });
      },

      logout: function() {
        // OAuth.revokeToken();
        $cookies.remove('token');
        return $timeout(function () {
          $state.go('public.login');
        });
      },

      profile: function() {
        if (!currentUserPromise) {
          currentUserPromise = fetchUser(userId);
        }
        return currentUserPromise;
      },

      isAuthenticated: function() {
        return OAuth.isAuthenticated();
      },

      checkLoggedIn: function() {
        var deferred = $q.defer();

        if (this.isAuthenticated()) {
          deferred.resolve();
        } else {
          $timeout(function () {
            $state.go('public.login');
          });
          deferred.reject();
        }

        return deferred.promise;
      },

      skipLoggedIn: function() {
        var deferred = $q.defer();

        if (this.isAuthenticated()) {
          deferred.reject();
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      }
    });
  });

} (angular.module('festima')));
