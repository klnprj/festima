'use strict';

angular.module('festima')
  .controller('BuildingEditController', function ($stateParams, $location, toastr, buildingsManager, buildingDealersService) {
    var vm = this;

    vm.buildingId = $stateParams.buildingId;

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
      vm.building.update();

      for (var dealerId in vm.dealersPositionsMap) {
        buildingDealersService.saveDealerPositions(dealerId, vm.dealersPositionsMap[dealerId].positions);
      }

      $location.path('/building/show/' + vm.building.id);
    };

    vm.onSelectAddress = function(address) {
      vm.building.address = address.full_name;
      vm.building.location = address.geometry.centroid;
    };

    vm.contacts = [
      {name: 'one', info: 'email: one@mail.ru'},
      {name: 'two', info: 'email: two@mail.ru'}
    ];

    function onAddContact(newContact) {
      vm.contacts.push({name: newContact.contactName, info: newContact.info});
    }

    vm.onAddContact = onAddContact;
  }
);
