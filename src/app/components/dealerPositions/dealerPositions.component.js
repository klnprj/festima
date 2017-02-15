(function(app) {
  'use strict';

  app.component('esDealerPositions', {
    templateUrl: 'app/components/dealerPositions/dealer-positions.html',
    bindings: {
      positions: '<',
      newPosition: '<',
      onAddPosition: '&',
      onDeletePosition: '&'
    },
    controller: DealerPositionsController,
    controllerAs: 'positionsVm',
    transclude: true
  });

  /** @ngInject */
  function DealerPositionsController() {
    var vm = this;

    vm.types = ['фасады', 'интерьеры'];
    vm.statuses = ['на согласовании', 'утвержден', 'отгружен','не согласован'];
    // vm.statuses = [
    //   { code: 'PRESALE', label: 'на согласовании' },
    //   { code: 'APPROVED', label: 'утвержден' },
    //   { code: 'SHIPPED', label: 'отгружен' },
    //   { code: 'REJECTED', label: 'не согласован' }
    // ];

    angular.extend(vm, {

      addNewPosition: function() {
        var newPosition = angular.copy(vm.newPosition);
        angular.extend(newPosition, vm.inputPosition);
        vm.inputPosition = {};
        vm.onAddPosition({dealerId: newPosition.dealerId, position: newPosition});
      },

      removePosition: function(position) {
        vm.onDeletePosition({dealerId: position.dealer.id, position: position});
      },

      activePosition: function(item) {
        return item.removed === undefined;
      },

      editPosition: function(position) {

      }

    });
  }

}(angular.module('festima')));
