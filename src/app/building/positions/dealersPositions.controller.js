angular.module('festima')
  .controller('DealersPositionsController', function (dealers, positions) {
      var vm = this;

      // vm.buildingDealersMap = {};  // map dealer name and positions to their ids
      // vm.dealersMap = {};  // map dealers to their ids

      angular.extend(vm, {
        refreshDealers: function() {
          dealers.list().then(function(resp) {
            vm.dealers = resp.data;

            var dealer;
            for (var i=0; i<vm.dealers.length; i++) {
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

      // vm.refreshDealers();
      // vm.refreshPositions();
    }
  );
