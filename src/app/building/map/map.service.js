(function (app) {
  'use strict';

  app.service('maps', function ($q) {
      var dgis;

      function estimaModule(dgis) {

        function configMap(latLng) {
          var zoom = this.detailedZoom;

          if (angular.isUndefined(latLng)) {
            latLng = [55.752142, 37.617067];
            zoom = this.overviewZoom;
          }

          return {
            center: latLng,
            zoom: zoom,
            geoclicker: true,
            showPhotos: false,
            showBooklet: false
          };
        }

        function centroidToLatlng(wkt) {
          var point = dgis.Wkt.toPoints(wkt);
          return [point[1], point[0]];
        }

        return {
          detailedZoom: 16,
          overviewZoom: 9,
          configMap: configMap,
          centroidToLatlng: centroidToLatlng
        };
      }

      function initDgisContainer() {
        var deferred = $q.defer();

        if (DG.ready === false) {
          DG.then(function () {

            DG.estima = estimaModule(DG);

            deferred.resolve({dgis: DG});
          });
        } else {
          deferred.resolve({dgis: DG});
        }

        return deferred.promise;
      }

      angular.extend(this, {

        detailedZoom: 16,
        overviewZoom: 9,

        initDgisContainer: initDgisContainer,

        initMap: function (latLng) {
          var zoom = this.detailedZoom;

          if (angular.isUndefined(latLng)) {
            latLng = [55.752142, 37.617067];
            zoom = this.overviewZoom;
          }

          return initDgisContainer().then(function (container) {
            dgis = container.dgis;
            var map = container.dgis.map('map', {
              center: latLng,
              zoom: zoom,
              geoclicker: true,
              showPhotos: false,
              showBooklet: false
            });

            return map;
          })
        },

        suggestions: function (q) {
          var deferred = $q.defer();

          dgis.ajax({
            url: 'http://catalog.api.2gis.ru/2.0/suggest/list',
            data: {
              key: 'rutnpt3272',
              output: 'json',
              region_id: 32,
              q: q
            },
            type: 'GET',
            success: function (data) {
              deferred.resolve(data.result.items);
            },
            error: function (error) {
              console.log(error);
              deferred.reject();
            }
          });

          return deferred.promise;
        },

        getById: function (id) {
          var deferred = $q.defer();

          dgis.ajax({
            url: 'http://catalog.api.2gis.ru/2.0/geo/get',
            data: {
              key: 'rutnpt3272',
              id: id,
              fields: 'items.geometry.centroid'
            },
            type: 'GET',
            success: function (data) {
              deferred.resolve(data.result.items[0]);
            },
            error: function (error) {
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
              key: 'rutnpt3272',
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
              key: 'rutnpt3272',
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

        getMarker: function (latLng) {
          return dgis.marker(latLng);
        },
        getMarkerPromise: function (latLng) {
          return initDgisContainer().then(function (container) {
            return container.dgis.marker(latLng);
          });
        },
        centroidToLatlng: function (wkt) {
          var point = DG.Wkt.toPoints(wkt);

          return [point[1], point[0]];
        },

        latLngToWkt: function (latLng) {
          return "POINT(" + latLng[1] + " " + latLng[0] + ")";
        },

        search: function (q) {
          var deferred = $q.defer();

          dgis.ajax({
            url: 'http://catalog.api.2gis.ru/2.0/geo/search',

            data: {
              key: 'ruewin2963',
              q: q,
              region_id: 32,
              fields: 'hash,search_attributes,items.address,items.adm_div,items.geometry.centroid,items.geometry.selection,items.geometry.style,items.floors,items.group'
            },
            success: function (data) {

              deferred.resolve(data.result.items);
            },
            error: function (error) {
              console.log(error);
              deferred.reject();
            }
          });

          return deferred.promise;
        }
      });
    }
  );
}(angular.module('festima')));
