'use strict';

(function() {
  angular.module('festima')
    .service('maps', function($q) {
      var dgis;

      angular.extend(this, {
        dgis: dgis,

        initMap: function () {
          var deferred = $q.defer();

          DG.then(function () {
            dgis = DG;
            var map = dgis.map('map', {
              center: [54.981, 82.891],
              zoom: 16,
              geoclicker: true,
              showPhotos: false,
              showBooklet: false
            });

            dgis.marker([54.98, 82.89]).addTo(map).bindPopup('Clicked!');

            deferred.resolve(map);
          }, function() {
            deferred.reject();
          });

          return deferred.promise;
        },

        suggestions: function(q) {
          var deferred = $q.defer();

          dgis.ajax({
            url: 'http://catalog.api.2gis.ru/2.0/suggest/list',
            data: {
              key: 'ruczoy1743',
              output: 'json',
              region_id: 32,
              q: q
            },
            type: 'GET',
            success: function(data) {
              deferred.resolve(data.result.items);
            },
            error: function(error) {
              console.log(error);
              deferred.reject();
            }
          });

          return deferred.promise;
        },

        getById: function(id) {
          var deferred = $q.defer();

          dgis.ajax({
            url: 'http://catalog.api.2gis.ru/2.0/geo/get',
            data: {
              key: 'ruczoy1743',
              id: id,
              fields: 'items.geometry.centroid'
            },
            type: 'GET',
            success: function(data) {
              deferred.resolve(data.result.items[0]);
            },
            error: function(error) {
              console.log(error);
              deferred.reject();
            }
          });

          return deferred.promise;
        },

        searchAddress: function (q) {
          var point, lng, lat;
          var deferred = $q.defer();

          dgis.ajax({
            url: 'http://catalog.api.2gis.ru/geo/search',
            data: {
              key: 'ruczoy1743',
              version: 1.3,
              q: q
            },
            type: 'GET',
            success: function (data) {
              // считываем строку в WKT-формате и возвращаем объект Point
              point = dgis.Wkt.toPoints(data.result[0].centroid);

              // извлекаем координаты для маркера
              lng = point[0];
              lat = point[1];

              deferred.resolve([lat, lng]);
            },
            error: function (error) {
              console.log(error);
              deferred.reject();
            }
          });

          return deferred.promise;
        },

        searchCoords: function (latLng) {
          var deferred = $q.defer();

          dgis.ajax({
            url: 'http://catalog.api.2gis.ru/geo/search',
            data: {
              key: 'ruczoy1743',
              version: 1.3,
              q: latLng[1] + ',' + latLng[0]
            },
            success: function (data) {

              deferred.resolve(data.result[0]);
            },
            error: function (error) {
              console.log(error);
              deferred.reject();
            }
          });

          return deferred.promise;
        },

        getMarker: function(latLng) {
          return dgis.marker(latLng);
        },

        centroidToLatlng: function(wkt) {
          var point = dgis.Wkt.toPoints(wkt);

          return [point[1], point[0]];
        }
      });
    }
  );
})();
