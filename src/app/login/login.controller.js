(function(app) {
  'use strict';

  app.controller('LoginController', function($http, $state, toastr, appConfig, OAuth, OAuthToken, spinnerService, session) {
    var vm = this;

    vm.login = function() {
      var credentials = {username: vm.email, password: vm.password};

      vm.loginForm.$setPristine();
      // spinnerService.show("authSpinner");

      session.login(credentials).then(function(res) {
        $state.go('private.main');
      }).catch(function(err) {
        toastr.error("Неверная комбинация email/пароль!");

        vm.loginForm.password.$setValidity("required", false);
        vm.password = '';
      }).finally(function() {
        // spinnerService.hide('authSpinner');
      });
    };

    vm.logout = function() {
      session.logout();
    };
  });


} (angular.module('festima')));
