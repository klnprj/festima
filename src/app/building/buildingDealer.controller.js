angular.module('festima')
  .controller('BuildingDealerController', function(positions) {
    var vm = this;

    angular.extend(vm, {
      newPosition: {},
      refreshPositions: function() {
        positions.list(vm.buildingDealer.id).then(function(response) {
          vm.positions = response.data;
        }, function(response) {
          console.log("couldn't load positions");
        });
      },
      addNewPosition: function() {
        positions.create(vm.buildingDealer.id, vm.newPosition).then(function() {
          console.log('successfully saved new position');
          vm.refreshPositions();
          vm.newPosition = {};
        });
      }
    });

    vm.refreshPositions();
  }
);
