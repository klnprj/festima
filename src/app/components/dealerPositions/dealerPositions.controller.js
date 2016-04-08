angular.module('festima')
  .controller('DealerPositionsController', function() {
    var vm = this;

    angular.extend(vm, {

      addNewPosition: function() {
        var newPosition = angular.copy(vm.newPosition);
        angular.extend(newPosition, vm.inputPosition);
        vm.inputPosition = {};
        vm.onAddPosition({dealerId: newPosition.dealerId, position: newPosition});
      },

      removePosition: function(position) {
        vm.onDeletePosition({dealerId: position.dealerId, position: position});
      },

      activePosition: function(item) {
          return item.removed === undefined;
      }

    });
  }
);
