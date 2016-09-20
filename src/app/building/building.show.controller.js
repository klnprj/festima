'use strict';

angular.module('festima')
  .controller('BuildingShowController', function ($stateParams, buildingsManager, maps) {
    var id = $stateParams.buildingId;
    var vm = this;

    vm.comments = [
      {author: {name: 'admin'}, date: 'August 25, 2014 at 9:30 PM', text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'},
      {author: {name: 'user'}, date: 'August 25, 2014 at 9:30 PM', text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'}
    ];

    buildingsManager.getBuilding(id).then(function(building) {
        vm.building = building;

        DG.then(function () {
          var map, point, lat, lng, marker;

          var latLng = maps.centroidToLatlng(vm.building.location);
          lat = latLng[0];
          lng = latLng[1];

          map = DG.map('map', {
            center: latLng,
            zoom: 16
          });

          DG.marker(latLng).addTo(map).bindPopup('Вы кликнули по мне!');



          // DG.ajax({
          //   url: 'http://catalog.api.2gis.ru/geo/search',
          //   data: {
          //     key: 'ruczoy1743',
          //     version: 1.3,
          //     q: 'Москва, Красная площадь, 2'
          //   },
          //   type: 'GET',
          //   success: function(data) {
          //     if (typeof marker !== 'undefined') {
          //       map.removeLayer(marker);
          //     }
          //
          //     // считываем строку в WKT-формате и возвращаем объект Point
          //     point = DG.Wkt.toPoints(data.result[0].centroid);
          //
          //     // извлекаем координаты для маркера
          //     lng = point[0];
          //     lat = point[1];
          //
          //     // создаем и добавляем маркер на карту
          //     marker = DG.marker([lat, lng]);
          //     map.addLayer(marker);
          //
          //     // центрируем карту в координаты маркера
          //     map.panTo([lat, lng]);
          //   },
          //   error: function(error) {
          //     console.log(error);
          //   }
          // });
        });
      }
    );
  }
);
