'use strict';

angular.module('festima')
  .service('buildingDealersService', function (dealers, positions) {
      var buildingDealersMap = {};  // map dealer name and positions to their ids
      var dealersMap = {};          // map dealers to their ids
      var buildingPositions;
      var dealerList;
      var _dealers;

      angular.extend(this, {
        buildingDealersMap: buildingDealersMap,

        loadPositions: function (buildingId) {
          positions.list1(buildingId).then(function (response) {
            buildingPositions = response.data;

            var dealerId;
            for (var i = 0; i < buildingPositions.length; i++) {
              dealerId = buildingPositions[i].dealerId;

              if (buildingDealersMap[dealerId] === undefined) {
                buildingDealersMap[dealerId] = {name: dealersMap[dealerId].name, positions: []};
              }

              buildingDealersMap[dealerId].positions.push(buildingPositions[i]);
            }
          }, function (response) {
            console.log("couldn't load positions");
          });
        },

        savePositions: function () {
          var dealerMap;
          var position;
          // save changes in dealers positions
          for (var dealerId in buildingDealersMap) {
            dealerMap = buildingDealersMap[dealerId];

            for (var i = 0; i < dealerMap.positions.length; i++) {
              position = dealerMap.positions[i];

              if (position.buildingId === undefined) {
                position.buildingId = position.building.id;
                delete position['building'];
              }

              if (position.id === undefined) {
                positions.create1(position).then(function (resp) {
                  position.id = resp.data.id;
                  console.log('Saved position ' + position.id);
                });
              }

              if (position.removed === true) {
                positions.delete(position.id).then(function (resp) {
                  var index = dealerMap.positions.map(function (e) {
                    return e.id;
                  }).indexOf(position.id);
                  dealerMap.positions.splice(index, 1);
                });
              }
            }
          }
        },

        addDealerPosition: function (dealerId, position) {
          buildingDealersMap[dealerId].positions.push(position);
        },

        removeDealerPosition: function (dealerId, position) {
          var dealerMap = buildingDealersMap[dealerId];

          if (position.id === undefined) {
            var index = dealerMap.positions.indexOf(position);
            if (index !== -1) {
              dealerMap.positions.splice(index, 1);
            }
          } else {
            position.removed = true;
          }
        },

        dealers: _dealers,

        loadDealers: function () {
          dealers.list().then(function (resp) {
            dealerList = resp.data;

            var dealer;
            // todo: If dealers not loaded yet?
            for (var i = 0; i < dealerList.length; i++) {
              dealer = dealerList[i];
              if (dealersMap[dealer.id] === undefined) {
                dealersMap[dealer.id] = dealer;
              }
            }
          })
        },

        refreshDealers: function (q) {
          dealers.list().then(function (resp) {
            _dealers = resp.data;
            // angular.copy(_dealers, resp.data);

            var dealer;
            for (var i = 0; i < _dealers.length; i++) {
              dealer = _dealers[i];
              if (dealersMap[dealer.id] === undefined) {
                dealersMap[dealer.id] = dealer;
              }
            }
          })
        },
        
        addDealer: function(dealer) {
          var index = Object.keys(buildingDealersMap).indexOf(dealer.id);

          if (index === -1) {
            buildingDealersMap[dealer.id] = {name: dealer.name, positions: []};
          }
        }
      });
    }
  );
