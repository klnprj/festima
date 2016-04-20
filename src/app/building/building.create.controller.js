'use strict';

angular.module('festima')
  .controller('BuildingCreateController', function($location, Building, toastr) {
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
    
    vm.searchAddress = function(q) {
      DG.then(function () {
        var map, point, lat, lng, marker;

        map = DG.map('map', {
          center: [54.9802, 82.8980],
          zoom: 18
        });

        DG.marker([54.98, 82.89]).addTo(map).bindPopup('Вы кликнули по мне!');

        DG.ajax({
          url: 'http://catalog.api.2gis.ru/geo/search',
          data: {
            key: 'ruczoy1743',
            version: 1.3,
            q: q
          },
          type: 'GET',
          success: function(data) {
            if (typeof marker !== 'undefined') {
              map.removeLayer(marker);
            }

            // считываем строку в WKT-формате и возвращаем объект Point
            point = DG.Wkt.toPoints(data.result[0].centroid);

            // извлекаем координаты для маркера
            lng = point[0];
            lat = point[1];

            // создаем и добавляем маркер на карту
            marker = DG.marker([lat, lng]);
            map.addLayer(marker);

            // центрируем карту в координаты маркера
            map.panTo([lat, lng]);
          },
          error: function(error) {
            console.log(error);
          }
        });
      });      
    };   
  }
);
