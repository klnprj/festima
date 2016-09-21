'use strict';

angular.module('festima')
  .controller('BuildingShowController', function ($stateParams, toastr, buildingsManager, maps, comments, session) {
    var id = $stateParams.buildingId;
    var vm = this;

    vm.comments = [];
    loadComments();

    function loadComments() {
      comments.listAllByBuilding(id).then(function(comments) {
        vm.comments = comments;
      });
    }

    function addNewComment(text) {
      comments.createComment(id, {authorId: session.userId(), text: text}).then(function(newComment) {
        toastr.success('Комментарий добавлен.');
        loadComments();
      });
    }

    vm.addComment = addNewComment;

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
