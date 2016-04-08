angular.module('festima').component('esBuildingDealers', {
  templateUrl: 'app/components/buildingDealers/building-dealers.html',
  bindings: {
    building: '<',
    buildingId: '<',
    dealers: '<'
  },
  controller: 'BuildingDealersController',
  controllerAs: 'dealersVm'
});
