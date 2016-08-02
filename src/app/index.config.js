(function() {
  'use strict';

  angular
    .module('festima')
    .config(config);

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

  angular.module('festima', ['angular-oauth2'])
    .config(['OAuthProvider', function(OAuthProvider) {
      OAuthProvider.configure({
        baseUrl: 'http://localhost:8080',
        clientId: 'estima-client'
        // clientSecret: 'CLIENT_SECRET' // optional
      });
    }]);

})();
