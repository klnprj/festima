angular.module('festima')
  .controller('DealerController', function(positions) {
    var vm = this;

    angular.extend(vm, {
      newPosition: {},
      refreshPositions: function() {
        positions.list(vm.dealer.id).then(function(response) {
          vm.positions = response.data;
        }, function(response) {
          console.log("couldn't load positions");
        });
      },
      addNewPosition: function() {
        positions.create(vm.dealer.id, vm.newPosition).then(function() {
          console.log('successfully saved new position');
          vm.refreshPositions();
          vm.newPosition = {};
        });
      }
    });

    vm.refreshPositions();
  }
);
