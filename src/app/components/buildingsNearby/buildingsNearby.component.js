(function(app){
  'use strict';

  app.component('esBuildingsNearby', {
    templateUrl: 'app/components/buildingsNearby/buildings-nearby.html',
    bindings: {
      address: '<'
    },
    controllerAs: 'vm',
    controller: BuildingsNearbyController
  });

  function BuildingsNearbyController(maps, addresses, toastr) {
    var vm = this;

    var findNearbyBuildings = function(address) {
      var latLng;

      if (address) {
        latLng = maps.centroidToLatlng(address.geometry.centroid);
        addresses.listWithinRadius(latLng, 1000).then(
          function(buildings) {
            if (!_.isEmpty(buildings)) {
              toastr.error('Найдены объекты в радиусе 1 км!');
            }
            vm.buildings = buildings;
          }
        );
      }
    };

    Object.defineProperty(vm, 'address', {
      get: function() {
        return vm._address;
      },
      set: function(newVal) {
        vm._address = newVal;
        findNearbyBuildings(newVal);
      }
    });
  }

}(angular.module('festima')));
