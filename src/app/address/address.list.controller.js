(function(app) {
  'use strict';

  app.controller('AddressListController', function(_, maps, addresses) {
    var vm = this;

    // vm.buildings = [];

    vm.onSelectAddress = function(address) {
      console.log('Selected address', address);

      var latLng = maps.centroidToLatlng(address.geometry.centroid);
      var buildings = addresses.listWithinRadius(latLng, 1000).then(
        function(buildings) {
          vm.buildings = buildings;
        }
      );

      console.log(latLng);
    };
  });

}) (angular.module('festima'));
