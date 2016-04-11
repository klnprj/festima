angular.module('festima')
  .controller('BuildingEditController', function ($routeParams, $location, toastr, buildingsManager, buildingDealersService) {
      var vm = this;

      vm.buildingId = $routeParams.buildingId;

      buildingsManager.getBuilding(vm.buildingId).then(
        function (building) {
          vm.building = building;
        },
        function () {
          toastr.info('Объект не найден');
          $location.url('/building/list');
        }
      );

      buildingDealersService.getDealersPositionsMap(vm.buildingId).then(function (mapOfDealersPositions) {
        vm.dealersPositionsMap = mapOfDealersPositions;
      });

      vm.addDealerPosition = function (dealerId, position) {
        vm.dealersPositionsMap[dealerId].positions.push(position);
      };

      vm.removeDealerPosition = function (dealerId, position) {
        var dealerPositions = vm.dealersPositionsMap[dealerId].positions;

        if (position.id === undefined) {
          var index = dealerPositions.indexOf(position);
          if (index !== -1) {
            dealerPositions.splice(index, 1);
          }
        } else {
          position.removed = true;
        }
      };

      vm.addDealer = function (dealer) {
        if (!vm.isAddedDealer(dealer)) {
          vm.dealersPositionsMap[dealer.id] = {name: dealer.name, positions: []};
        }
      };

      vm.isAddedDealer = function (dealer) {
        var index = Object.keys(vm.dealersPositionsMap).indexOf(String(dealer.id));

        return index >= 0;
      };

      vm.saveChanges = function () {
        // save changes in building properties
        if (vm.buildingId === undefined) {
          vm.building.save().then(function (response) {
            vm.buildingId = response.data.id;
            vm.building = response.data;
            $location.path('/building/show/' + vm.building.id);
          });

          return;
        }

        vm.building.update();

        for (var dealerId in vm.dealersPositionsMap) {
          buildingDealersService.saveDealerPositions(dealerId, vm.dealersPositionsMap[dealerId].positions);
        }
        
        $location.path('/building/show/' + vm.building.id);
      };
    
    }
  );
