(function(app) {
  'use strict';

  app.component('esDealerPosition', {
    templateUrl: 'app/components/dealerPosition/dealer-position.html',
    bindings: {
      position: '<',
      types: '<',
      statuses: '<',
      onRemovePosition: '&'
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
      vm.position.edited = true;
    };

    vm.cancel = function() {
      vm.editFlag = false;
    };

    vm.remove = function() {
      vm.onRemovePosition({position: vm.position});
    };
  }

}(angular.module('festima')));
