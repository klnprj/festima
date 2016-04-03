angular.module('festima')
  .controller('BuildingDealerController', function($uibModal, $log, positions) {
    var vm = this;

    angular.extend(vm, {

      initNewPosition: function() {
        var buildingId = vm.building.name;
        return {building: vm.building, dealerId: vm.dealerId};
      },

      refreshDealerPositions: function() {
        // positions.list1(vm.buildingId, vm.dealerId).then(function(response) {
        positions.list1(vm.building.id, vm.dealerId).then(function(response) {
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
      },

      openMessages: function (_position) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/building/positions/_messages-modal.html',
          controller: 'PositionMessagesInstanceController',
          size: 'lg',
          resolve: {
            position: function () {
              return _position;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          // $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }

    });

    vm.newPosition = vm.initNewPosition();

  }
);
