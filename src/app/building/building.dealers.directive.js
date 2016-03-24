angular.module('festima')
  .directive('esBuildingDealers', function() {
    return {
      scope: {
        buildingId: '='
      },
      templateUrl: 'app/building/building-dealers.html',
      controllerAs: 'buildingDealersVm',
      bindToController: true,
      controller: 'BuildingDealersController'
    };
});
