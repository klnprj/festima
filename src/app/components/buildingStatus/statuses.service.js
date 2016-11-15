(function(app) {
  'use strict';

  app.service('statuses', StatusesService);

  function StatusesService() {
    var statuses = [
      { code: 'ACTIVE', label: 'в работе' },
      { code: 'SHIPPED', label: 'отгружен' },
      { code: 'SUSPEND', label: 'заморожен' },
      { code: 'FAILED', label: 'проигран' }
    ];

    this.list = function() {
      return statuses;
    };
  }

}(angular.module('festima')));
