'use strict';

angular.module('festima')
  .controller('BuildingCreateController', function($location, Building, maps, toastr) {
    var vm = this;

    vm.building = new Building();

    vm.saveChanges = function () {
      vm.building.save().then(function (building) {
        vm.buildingId = building.id;
        vm.building = building;
        $location.path('/building/show/' + vm.building.id);
      });

      toastr.success('Новый объект "' + vm.building.name + '" добавлен!');
    };

    maps.initMap().then(function(map) {
      vm.map = map;

      vm.map.on('click', function (e) {
        var latLng = [e.latlng.lat, e.latlng.lng];
        console.log(latLng);

        maps.searchCoords(latLng).then(function (location) {
          vm.location = location;
          vm.address = location.name;

          if (typeof vm.marker !== 'undefined') {
            vm.map.removeLayer(vm.marker);
          }

          vm.marker = maps.getMarker(latLng);
          var text = location.name + '.<br />';

          text += location.attributes.buildingname;
          vm.marker.bindPopup(text);
          vm.marker.addTo(vm.map);
        });
      });
    });

    vm.searchAddress = function(q) {
      maps.searchAddress(q).then(function(latLng){

        if (typeof vm.marker !== 'undefined') {
          vm.map.removeLayer(vm.marker);
        }

        // создаем и добавляем маркер на карту
        vm.marker = maps.getMarker(latLng);
        vm.map.addLayer(vm.marker);

        // центрируем карту в координаты маркера
        vm.map.panTo(latLng);
      });
    };
  }
);
