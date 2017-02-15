(function(app) {
  'use strict';

  app.component('esDealerPosition', {
    templateUrl: 'app/components/dealerPosition/dealer-position.html',
    bindings: {
      position: '<'
     },
    controllerAs: 'positionVm',
    controller: DealerPosition
  });

  /** @ngInject */
  function DealerPosition() {
    var vm = this;

    vm.editFlag = false;

    vm.edit = function() {
      vm.editFlag =  true;
    };

    vm.save = function() {
      vm.editFlag = false;
    };

    vm.cancel = function() {
      vm.editFlag = false;
    }
  }

}(angular.module('festima')));
