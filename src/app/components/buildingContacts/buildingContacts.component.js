(function(app) {
  'use strict';

  app.component('esBuildingContacts', {
    templateUrl: 'app/components/buildingContacts/building-contacts.html',
    bindings: {
      contacts: '<'
    },
    controllerAs: 'buildingContactsVm',
    controller: BuildingContactsController
  });

  function BuildingContactsController() {
    var vm = this;
  }

}(angular.module('festima')));
