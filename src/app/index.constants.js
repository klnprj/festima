/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('festima')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('appConfig', {
      'apiUrl': 'http://localhost:8080/api'
    });

})();
