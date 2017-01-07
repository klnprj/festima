(function(app) {
  'use strict';

  app.controller('AddressListController', function($q, $location, $rootScope, _, maps, addresses) {
    var vm = this;
    var allMarkersLayers;

    vm.filtersOpen = false;
    vm.buildings = [];

    function findNearbyBuildings(address, filters) {
      var latLng;
      var buildingsPromise;

      if (address) {
        latLng = maps.centroidToLatlng(address.geometry.centroid);
        buildingsPromise = addresses.listWithinRadius(latLng, 1000);
      } else {
        buildingsPromise = addresses.searchAddresses({}, filters);
      }

      return buildingsPromise;
    }

    function positionBuildingsOnMap(buildings, map) {
      if (allMarkersLayers) {
        allMarkersLayers.clearLayers();
      }
      var markers = [];
      buildings.forEach(function(building) {
        var latLng = maps.centroidToLatlng(building.location);

        var marker = DG.marker(latLng, {
          label: building.name
        });

        markers.push(marker);

        marker['buildingId'] = building.id;
        marker['buildingName'] = building.name;

        marker.on('dblclick', function(e) {
          $rootScope.$apply( function(){$location.path('/building/show/' + e.target.buildingId); } );
        });
      });

      allMarkersLayers = DG.layerGroup(markers);
      allMarkersLayers.addTo(map);
    }

    DG.then(function() {
      var mapPromise = maps.initMap();
      searchAndDisplayBuildingsOnMap(mapPromise, {});
    });

    function searchAndDisplayBuildingsOnMap(mapPromise, filters) {
      var buildingsPromise = findNearbyBuildings(null, filters);

      $q.all({map: mapPromise, buildings: buildingsPromise}).then(function(results) {
        vm.map = results.map;
        vm.buildings = results.buildings;

        positionBuildingsOnMap(results.buildings, results.map);
      });
    }

    vm.onSelectAddress = function(item) {
      var latLng = maps.centroidToLatlng(item.geometry.centroid);

      vm.addressObject = item;

      vm.map.setZoom(maps.detailedZoom);
      vm.map.panTo(latLng);
    };

    vm.onApplyFilters = function(criteria, filters) {
      searchAndDisplayBuildingsOnMap($q.when(vm.map), filters);
    };
  });

}) (angular.module('festima'));
