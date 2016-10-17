(function(app) {
  'use strict';

  app.component('esBuildingContacts', {
    templateUrl: 'app/components/buildingContacts/building-contacts.html',
    bindings: {
      contacts: '<',
      onRemoveContact: '&'
    },
    controllerAs: 'buildingContactsVm',
    controller: BuildingContactsController
  });

  function BuildingContactsController() {
    var vm = this;

    vm.removeContact = function(contact) {
      vm.onRemoveContact({contact: contact});
    };
  }

}(angular.module('festima')));
