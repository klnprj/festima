/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('festima')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('_', window._)
    .constant('appConfig', {
      'apiUrl': 'http://138.201.116.95:8080/api'
    });

})();
