angular.module('festima')
  .controller('BuildingEditController', function ($routeParams, $location, buildingsManager, dealers, positions) {
      var vm = this;
      var id = $routeParams.buildingId;

      buildingsManager.getBuilding(id).then(
        function (building) {
          vm.building = building;
        }
      );


      vm.buildingDealersMap = {};  // map dealer name and positions to their ids
      vm.dealersMap = {};  // map dealers to their ids


      angular.extend(vm, {
        buildingId: id,

        addDealer: function(dealer) {
          var index = Object.keys(vm.buildingDealersMap).indexOf(dealer.id);

          if (index === -1) {
            vm.buildingDealersMap[dealer.id] = {name: dealer.name, positions: []};
          }

          vm.dealer = {};
        },

        saveChanges: function () {
          // save changes in building properties


          var dealerMap;
          var position;
          // save changes in dealers positions
          for (var dealerId in vm.buildingDealersMap) {
            dealerMap = vm.buildingDealersMap[dealerId];

            for (var i=0; i<dealerMap.positions.length; i++) {
              position = dealerMap.positions[i];

              if (position.id === undefined) {
                positions.create1(position).then(function(resp) {
                  position.id = resp.data.id;
                  console.log('Saved position ' + position.id);
                });
              }

              if (position.removed === true) {
                positions.delete(position.id).then(function(resp) {
                  var index = dealerMap.positions.map(function(e) { return e.id; }).indexOf(position.id);
                  dealerMap.positions.splice(index, 1);
                });
              }
            }
          }

          $location.path('/building/show/' + vm.building.id);
        },

        refreshDealers: function () {
          dealers.list().then(function (resp) {
            vm.dealers = resp.data;

            var dealer;
            for (var i = 0; i < vm.dealers.length; i++) {
              dealer = vm.dealers[i];
              if (vm.dealersMap[dealer.id] === undefined) {
                vm.dealersMap[dealer.id] = dealer;
              }
            }
          })
        },

        refreshPositions: function () {
          positions.list1(vm.buildingId).then(function (response) {
            vm.positions = response.data;

            var dealerId;
            for (var i = 0; i < vm.positions.length; i++) {
              dealerId = vm.positions[i].dealerId;

              if (vm.buildingDealersMap[dealerId] === undefined) {
                vm.buildingDealersMap[dealerId] = {name: vm.dealersMap[dealerId].name, positions: []};
              }

              vm.buildingDealersMap[dealerId].positions.push(vm.positions[i]);
            }
          }, function (response) {
            console.log("couldn't load positions");
          });
        },
      });

      vm.refreshDealers();
      vm.refreshPositions();
    }
  );
