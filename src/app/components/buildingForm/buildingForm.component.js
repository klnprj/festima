(function(app) {
  'use strict';

  app.component('esBuildingForm', {
    templateUrl: 'app/components/buildingForm/building-form.html',
    bindings: {
      building: '<'
    },
    controller: BuildingFormController,
    controllerAs: 'buildingFormVm',
    transclude: true
  });

  function BuildingFormController(statuses) {
    var vm = this;

    vm.statuses = statuses.list();
  }

}(angular.module('festima')));
