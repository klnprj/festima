angular.module('festima')
  .controller('BuildingAddressController', function (maps) {
      var vm = this;

      var latLng0;

      if (angular.isDefined(vm.building)) {
        setSelected(vm.building.address);
      }

      function setSelected(address) {
        vm.asyncSelected = address;
      }

      DG.then(function () {

        if (angular.isDefined(vm.building) && angular.isDefined(vm.building.location)) {
          latLng0 = maps.centroidToLatlng(vm.building.location);
        }

        maps.initMap(latLng0).then(function (map) {
          vm.map = map;

          if (angular.isDefined(latLng0)) {
            vm.marker = maps.getMarker(latLng0);
            vm.marker.addTo(vm.map);
          }

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

              var locationFullName = location.name;

              var item = {geometry: {}};
              item.full_name = locationFullName;
              item.geometry.centroid = location.centroid;

              if (_.isEmpty(location.attributes.number)) {
                console.log('No building number!');
                item.geometry.centroid = maps.latLngToWkt(latLng);
              }

              setSelected(locationFullName);
              vm.onAddressSelected({address: item});
            });
          });
        });
      });

      vm.searchAddress = function (q) {
        maps.searchAddress(q).then(function (latLng) {

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

      vm.getLocation = function (q) {
        return maps.suggestions(q).then(function (items) {
          return items.map(function (item) {
            return item;
          });
        });
      };

      vm.onSelect = function (itemData, model, label) {
        maps.search(itemData.hint.text).then(function (items) {
          var item = items[0];

          if (typeof vm.marker !== 'undefined') {
            vm.map.removeLayer(vm.marker);
          }

          var latLng = maps.centroidToLatlng(item.geometry.centroid);

          // создаем и добавляем маркер на карту
          vm.marker = maps.getMarker(latLng);
          vm.map.addLayer(vm.marker);

          // центрируем карту в координаты маркера
          vm.map.setZoom(maps.detailedZoom);
          vm.map.panTo(latLng);

          setSelected(item.full_name);
          vm.onAddressSelected({address: item});
        });
      };
    }
  );

// angular.module('festima')
//   .controller('BuildingAddressController', function($q, maps) {
//     var vm = this;
//
//     if (angular.isDefined(vm.building)) {
//       setSelected(vm.building.address);
//     }
//
//     function setSelected(address) {
//       vm.asyncSelected = address;
//     }
//
//     var _building = vm.building;
//     Object.defineProperty(vm, 'building', {
//       get: function() {
//         return _building;
//       },
//       set: function(building) {
//         _building = building;
//         loadMap(building);
//       }
//     });
//
//     function displayLocation(latLng0) {
//
//       if (angular.isDefined(latLng0)) {
//         maps.getMarkerPromise(latLng0).then(function(marker) {
//           vm.marker = marker;
//           vm.marker.addTo(vm.map);
//         });
//       }
//
//       vm.map.on('click', function (e) {
//         var latLng = [e.latlng.lat, e.latlng.lng];
//         console.log(latLng);
//
//         maps.searchCoords(latLng).then(function (location) {
//           vm.location = location;
//           vm.address = location.name;
//
//           if (typeof vm.marker !== 'undefined') {
//             vm.map.removeLayer(vm.marker);
//           }
//
//           maps.getMarkerPromise(latLng).then(function(marker) {
//             vm.marker = marker;
//             var text = location.name + '.<br />';
//
//             text += location.attributes.buildingname;
//             vm.marker.bindPopup(text);
//             vm.marker.addTo(vm.map);
//           });
//
//           var locationFullName = location.name;
//
//           var item = {geometry: {}};
//           item.full_name = locationFullName;
//           item.geometry.centroid = location.centroid;
//
//           if (_.isEmpty(location.attributes.number)) {
//             console.log('No building number!');
//             item.geometry.centroid = maps.latLngToWkt(latLng);
//           }
//
//           setSelected(locationFullName);
//           vm.onAddressSelected({address: item});
//         });
//       });
//     }
//
//     function loadMap(building) {
//
//       maps.initDgisContainer().then(function(container) {
//         var latLng;
//
//         if (angular.isDefined(building) && angular.isDefined(building.location)) {
//           latLng = container.dgis.estima.centroidToLatlng(building.location);
//         }
//
//         var mapConfig = container.dgis.estima.configMap(latLng);
//
//         if (angular.isUndefined(vm.map)) {
//           vm.map = container.dgis.map('map', mapConfig);
//         } else {
//           var elem = vm.map.getContainer();
//           var elemParent = elem.parentNode;
//           var newElem = elem.cloneNode(false);
//           elemParent.replaceChild(newElem, elem);
//           vm.map = container.dgis.map(newElem, mapConfig);
//         }
//
//         displayLocation(latLng);
//       });
//     }
//
//     function initializeMap() {
//       loadMap(vm.building);
//     }
//
//     initializeMap();
//
//     vm.searchAddress = function(q) {
//       maps.searchAddress(q).then(function(latLng){
//
//         if (typeof vm.marker !== 'undefined') {
//           vm.map.removeLayer(vm.marker);
//         }
//
//         // создаем и добавляем маркер на карту
//         vm.marker = maps.getMarker(latLng);
//         vm.map.addLayer(vm.marker);
//
//         // центрируем карту в координаты маркера
//         vm.map.panTo(latLng);
//       });
//     };
//
//     vm.getLocation = function(q) {
//       return maps.suggestions(q).then(function(items){
//         return items.map(function(item){
//           return item;
//         });
//       });
//     };
//
//     vm.onSelect = function(itemData, model, label) {
//       maps.search(itemData.hint.text).then(function(items) {
//         var item = items[0];
//
//         if (typeof vm.marker !== 'undefined') {
//           vm.map.removeLayer(vm.marker);
//         }
//
//         var latLng = maps.centroidToLatlng(item.geometry.centroid);
//
//         // создаем и добавляем маркер на карту
//         vm.marker = maps.getMarker(latLng);
//         vm.map.addLayer(vm.marker);
//
//         // центрируем карту в координаты маркера
//         vm.map.setZoom(maps.detailedZoom);
//         vm.map.panTo(latLng);
//
//         setSelected(item.full_name);
//         vm.onAddressSelected({address: item});
//       });
//     };
//   }
// );
