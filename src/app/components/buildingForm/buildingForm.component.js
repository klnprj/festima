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

  function BuildingFormController() {
    var vm = this;
  }

}(angular.module('festima')));
