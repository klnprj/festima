'use strict';

angular.module('festima')
  .controller('BuildingDealersController', function (dealer) {
    var vm = this;

    angular.extend(vm, {
      list: function (q) {
        return dealer.list(q).then(function (response) {
          return response.data;
        });
      },
      // dealer: {},
      // addedDealers: [],
      refreshDealers: function (q) {
        vm.list(q).then(function (data) {
          vm.dealers = data;
        });
      },
      addDealer: function(dealer) {
        if (angular.isUndefined(dealer)) {
          return;
        }

        vm.dealer = undefined;

        for(var i=0; i<vm.addedDealers.length; i++) {
          if (vm.addedDealers[i].id === dealer.id) {
            return;
          }
        }
        vm.addedDealers.push(dealer);
      },

      saveDealers: function() {
        for (var i=0; i<vm.addedDealers.length; i++) {
          dealer.saveBuildingDealer(vm.buildingId, vm.addedDealers[i]).then(
            function(response) {
              // console.log('saved dealer: [buildingId:' + vm.buildingId + ', dealerId: ' + vm.addedDealers[i].id + ']');
            },
            null
          );
        }
      }
    });
  });
