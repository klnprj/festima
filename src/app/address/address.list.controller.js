(function(app) {
  'use strict';

  app.controller('AddressListController', function($q, _, maps, addresses) {
    var vm = this;

    vm.buildings = [];

    function findNearbyBuildings(address) {
      var latLng;
      var buildingsPromise;

      if (address) {
        latLng = maps.centroidToLatlng(address.geometry.centroid);
        buildingsPromise = addresses.listWithinRadius(latLng, 1000);
      } else {
        buildingsPromise = addresses.listWithinRadius();
      }

      return buildingsPromise;
    }

    function positionBuildingsOnMap(buildings, map) {
      buildings.forEach(function(building) {
        var latLng = maps.centroidToLatlng(building.location);
        console.log("latlng: ", latLng);
        DG.marker(latLng).addTo(map);
      })
    }

    DG.then(function() {
      var mapPromise = maps.initMap();
      var buildingsPromise = findNearbyBuildings();

      $q.all({map: mapPromise, buildings: buildingsPromise}).then(function(results) {
        vm.map = results.map;
        vm.buildings = results.buildings;

        positionBuildingsOnMap(results.buildings, results.map);
      });
    });

    vm.onSelectAddress = function(item) {
      var latLng = maps.centroidToLatlng(item.geometry.centroid);

      vm.map.panTo(latLng);
      vm.map.setZoom(maps.detailedZoom);
    };
  });

}) (angular.module('festima'));
