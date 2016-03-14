(function() {
  'use strict';

  angular
    .module('festima')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
