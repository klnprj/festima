(function() {
  'use strict';

  angular
    .module('festima')
    .config(config)
    .config(['OAuthProvider', function(OAuthProvider) {
      OAuthProvider.configure({
        grantPath: '/oauth/token',
        revokePath: '/oauth/revoke',
        baseUrl: 'http://localhost:8080',
        clientId: 'estima-client',
        options: {
          secure: false
        }
      });
    }])
    .config(['OAuthTokenProvider', function(OAuthTokenProvider) {
      OAuthTokenProvider.configure({
        name: 'token',
        options: {
          secure: false
        }
      });
    }]);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
