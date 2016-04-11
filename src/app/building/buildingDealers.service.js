'use strict';

angular.module('festima')
  .service('buildingDealersService', function (dealers, positions) {

      angular.extend(this, {

        getDealersPositionsMap: function(buildingId) {
          return positions.listAllByBuilding(buildingId).then(function(response) {
            var dealerPositionsMap = {};
            var buildingPositions = response.data;

            return dealers.mapAll().then(function(mapOfDealers) {

              var dealerId;
              for (var i = 0; i < buildingPositions.length; i++) {
                dealerId = buildingPositions[i].dealerId;

                if (angular.isUndefined(dealerPositionsMap[dealerId])) {
                  dealerPositionsMap[dealerId] = {name: mapOfDealers[dealerId].name, positions: []};
                }

                dealerPositionsMap[dealerId].positions.push(buildingPositions[i]);
              }

              return dealerPositionsMap;
            });
          })
        },

        saveDealerPositions: function(dealerId, positionsList) {
          var position;

          for (var i = 0; i < positionsList.length; i++) {
            position = positionsList[i];

            if (position.removed === true) {
              positions.delete(position.id).then(function () {
                var index = positionsList.map(function (e) {
                  return e.id;
                }).indexOf(position.id);
                positionsList.splice(index, 1);
              });
            }

            if (angular.isUndefined(position.buildingId)) {
              position.buildingId = position.building.id;
              delete position['building'];
            }

            if (angular.isUndefined(position.id)) {
              positions.createPosition(position).then(function (savedPosition) {
                position.id = savedPosition.id;
                console.log('Saved position ' + position.id);
              });
            }

          }

          // return changedPositions;
        },

      });
    }
  );
