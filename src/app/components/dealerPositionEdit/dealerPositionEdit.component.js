(function(app) {
  'use strict';

  app.component('esDealerPositionEdit', {
    templateUrl: 'app/components/dealerPositionEdit/dealer-position-edit.html',
    bindings: {
      position: '='
    },
    controllerAs: 'positionEditVm',
    controller: DealerPositionEdit
  });

  /** @ngInject */
  function DealerPositionEdit() {
    var vm = this;
  }

}(angular.module('festima')));
