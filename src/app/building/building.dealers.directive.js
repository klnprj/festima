angular.module('festima')
  .directive('esBuildingDealers', function(dealer) {
    return {
      scope: {
        buildingId: '=',
        addedDealers: '='
      },
      templateUrl: 'app/building/building-dealers.html',
      controllerAs: 'buildingDealersVm',
      bindToController: true,
      controller: 'BuildingDealersController'
    };
});
