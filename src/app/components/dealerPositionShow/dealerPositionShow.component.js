(function(app) {
  'use strict';

  app.component('esDealerPositionShow', {
    templateUrl: 'app/component/dealerPositionShow/dealer-position-show.html',
    bindings: {
      position: '<'
    },
    controllerAs: 'positionShowVm',
    controller: DealerPositionShow
  });

  /** @ngInject */
  function DealerPositionShow() {
    var vm = this;
  }

}(angular.module('app')));
