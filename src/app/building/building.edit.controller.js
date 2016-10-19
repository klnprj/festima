'use strict';

angular.module('festima')
  .controller('BuildingEditController', function ($stateParams, $location, $q, toastr, buildingsManager, buildings, buildingDealersService, contacts) {
    var vm = this;

    vm.buildingId = $stateParams.buildingId;

    buildings.get(vm.buildingId).then(
      function (building) {
        vm.building = building;
        vm.contacts = vm.building.contacts;
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
        vm.dealersPositionsMap[dealer.id] = {name: dealer.title, positions: []};
      }
    };

    vm.isAddedDealer = function (dealer) {
      var index = Object.keys(vm.dealersPositionsMap).indexOf(String(dealer.id));

      return index >= 0;
    };

    vm.saveChanges = function () {
      $q.all([buildings.update(vm.building), updateBuildingContacts(vm.contacts)]).then(function(response) {
        $location.path('/building/show/' + vm.building.id);
      });

      for (var dealerId in vm.dealersPositionsMap) {
        buildingDealersService.saveDealerPositions(dealerId, vm.dealersPositionsMap[dealerId].positions);
      }
    };

    vm.onSelectAddress = function(address) {
      vm.building.address = address.full_name;
      vm.building.location = address.geometry.centroid;
    };

    vm.contacts = [];

    function addContact(newContact) {
      vm.contacts.push({contact: {title: newContact.contactName, dictionary: {name: newContact.typeName}}, info: newContact.info, building: {id: vm.buildingId}, contactId: newContact.contactId});
    }

    function removeContact(contact) {
      if (contact.id === undefined) {
        var index = vm.contacts.indexOf(contact);
        if (index !== -1) {
          vm.contacts.splice(index, 1);
        }
      } else {
        contact.removed = true;
      }
    }

    vm.addContact = addContact;
    vm.removeContact = removeContact;

    function updateBuildingContacts(contactList) {
      var contact;
      var promises = [];

      if (_.isEmpty(contactList)) {
        return $q.when(null);
      }

      for(var i=0; i<contactList.length; i++) {
        contact = contactList[i];

        if (contact.removed === true) {
          promises.push(contacts.delete(contact));
        }

        if (contact.id === undefined) {
          promises.push(contacts.saveContact(contact));
        }
      }

      return $q.all(promises);
    }
  }
);
