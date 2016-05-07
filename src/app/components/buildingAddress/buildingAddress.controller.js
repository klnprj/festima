angular.module('festima')
  .controller('BuildingAddressController', function(maps) {
    var vm = this;

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

    vm.getLocation = function(q) {
      return maps.suggestions(q).then(function(items){
        return items.map(function(item){
          return item;
        });
      });
    };

    vm.onSelect = function(itemData, model, label) {
      maps.getById(itemData.id).then(function(item) {
        if (typeof vm.marker !== 'undefined') {
          vm.map.removeLayer(vm.marker);
        }

        var latLng = maps.centroidToLatlng(item.geometry.centroid);

        // создаем и добавляем маркер на карту
        vm.marker = maps.getMarker(latLng);
        vm.map.addLayer(vm.marker);

        // центрируем карту в координаты маркера
        vm.map.panTo(latLng);

        vm.asyncSelected = '';
        vm.onAddressSelected({address: item});
      });
    };
  }
);
