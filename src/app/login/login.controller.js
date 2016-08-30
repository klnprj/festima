(function(app) {
  'use strict';

  app.controller('LoginController', function($http, $state, appConfig, OAuth, OAuthToken, spinnerService, session) {
    var vm = this;

    vm.login = function() {
      var credentials = {username: vm.email, password: vm.password};

      // spinnerService.show("authSpinner");

      session.login(credentials).then(function() {
        $state.go('private.main');
      }).finally(function() {
        // spinnerService.hide('authSpinner');
      });
    };

    vm.logout = function() {
      session.logout();
    };
  });


} (angular.module('festima')));
