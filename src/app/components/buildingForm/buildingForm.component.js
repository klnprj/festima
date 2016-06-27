angular.module('festima').component('esBuildingForm', {
  templateUrl: 'app/components/buildingForm/building-form.html',
  bindings: {
    building: '<'
  },
  controller: 'BuildingFormController',
  controllerAs: 'buildingFormVm',
  transclude: true
});
