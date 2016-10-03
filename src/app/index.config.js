(function() {
  'use strict';

  angular
    .module('festima')
    .config(config)
    .config(['OAuthProvider', function(OAuthProvider) {
      OAuthProvider.configure({
        grantPath: '/oauth/token',
        revokePath: '/oauth/revoke',
        // baseUrl: 'http://localhost:8080',
        baseUrl: 'http://138.201.116.95:8080',
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
    }]).config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);
    }]).factory('AuthInterceptor', authInterceptor);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
  }

  function authInterceptor($q, $location) {
    return {
      response: function (response) {
        // do something on success
        return response;
      },
      responseError: function (response) {
        if (response.status === 401) {
          $location.url('/login');
        }
        return $q.reject(response);
      }
    };
  }

})();
