(function() {
  'use strict';

  angular
    .module('festima')
    .run(runBlock)
    .run(['$rootScope', '$window', '$state', 'OAuth', 'toastr', function($rootScope, $window, $state, OAuth, toastr) {
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
        toastr.error('Объект не найден');
        $state.go('private.buildinglist');
      });

      $rootScope.$on('oauth:error', function(event, rejection) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === rejection.data.error) {
          return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('invalid_token' === rejection.data.error) {
          return OAuth.getRefreshToken();
        }

        // Redirect to `/login` with the `error_reason`.
        return $window.location.href = '/login?error_reason=' + rejection.data.error;
      });
    }]);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
