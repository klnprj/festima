angular.module('festima')
  .component('esBuildingAddress', {
    templateUrl: 'app/components/buildingAddress/building-address.html',
    bindings: {
      building: '<',
      onAddressSelected: '&'
    },
    controllerAs: 'addressVm',
    controller: 'BuildingAddressController'
  }
);
