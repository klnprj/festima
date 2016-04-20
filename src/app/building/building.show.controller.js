'use strict';

angular.module('festima')
  .controller('BuildingShowController', function ($routeParams, buildingsManager) {
    var id = $routeParams.buildingId;
    var vm = this;

    buildingsManager.getBuilding(id).then(
      function(building) {
        vm.building = building;
      }
    );

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
          q: 'Москва, Красная площадь, 2'
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
  }
);
