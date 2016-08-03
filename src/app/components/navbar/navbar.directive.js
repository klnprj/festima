(function() {
  'use strict';

  angular
    .module('festima')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($http, appConfig, moment, OAuth, OAuthToken) {
      var vm = this;
      vm.isAuthenticated = OAuth.isAuthenticated();

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      vm.login = function() {
        var user = {username: vm.email, password: vm.password, scope: 'read'};
        var options = {};
        OAuth.getAccessToken(user, options).then(function(response) {
          vm.isAuthenticated = OAuth.isAuthenticated();
          $http.get(appConfig.apiUrl + '/users', {params: {email: vm.email}}).then(function(response) {
            vm.user = response.data[0];
          });
        });
      };

      vm.logout = function() {
        OAuth.revokeToken();
      };

    }
  }

})();
