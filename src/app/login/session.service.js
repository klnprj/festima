(function(app) {
  'use strict';

  app.service('session', function($http, $log, $q, $state, $rootScope, $timeout, $cookies, appConfig, OAuth, OAuthToken) {
    var currentUserPromise;
    var userEmail;
    var userId;

    function fetchUser(email) {
      return $http.get(appConfig.apiUrl + '/users', {params: {email: email}}).then(function(response) {
        var user = response.data[0];

        userId = user.id;
        return user;
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
          userEmail = credentials.username;
          currentUserPromise = fetchUser(userEmail);

        }).catch(function(e) {
          $log.error('Auth error: ', e);
          return $q.reject(e);
        });
      },

      logout: function() {
        // OAuth.revokeToken();
        $cookies.remove('token');
        return $timeout(function () {
          $state.go('public.login');
        });
      },

      getUserId: function() {
        return userId;
      },

      profile: function() {
        if (!currentUserPromise) {
          currentUserPromise = fetchUser(userEmail);
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
