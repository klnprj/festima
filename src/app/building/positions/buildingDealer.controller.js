angular.module('festima')
  .controller('BuildingDealerController', function(positions) {
    var vm = this;

    angular.extend(vm, {

      initNewPosition: function() {
        return {buildingId: vm.buildingId, dealerId: vm.dealerId};
      },

      refreshDealerPositions: function() {
        positions.list1(vm.buildingId, vm.dealerId).then(function(response) {
          vm.positions = response.data;
        }, function(response) {
          console.log("couldn't load positions");
        });
      },

      addNewPosition: function() {
        vm.positions.push(vm.newPosition);
        vm.newPosition = vm.initNewPosition();
      },

      removePosition: function(position) {
        if (position.id === undefined) {
          var index = vm.positions.indexOf(position);
          if(index !== -1) {
            vm.positions.splice(index, 1);
          }
        } else {
          position.removed = true;
        }
      },

      activePosition: function(item) {
          return item.removed === undefined;
        }
    });

    vm.newPosition = vm.initNewPosition();

  }
);
