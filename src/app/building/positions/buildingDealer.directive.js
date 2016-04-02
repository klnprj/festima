angular.module('festima')
  .directive('esBuildingDealer', function(positions) {
    return{
      templateUrl: 'app/building/positions/building-dealer.html',
      scope: {
        buildingId: '=',
        building: '=',
        dealerId: '=',
        dealerName: '=',
        positions: '='
      },
      controller: 'BuildingDealerController',
      controllerAs: 'dealerVm',
      bindToController: true
    }
});
