'use strict';

angular.module('festima')
  .controller('BuildingDealersController', function ($scope, dealer, buildingDealersManager) {
    var vm = this;

    vm.buildingDealers = [];
    vm.unsavedBuildingDealers = [];
    // without watch - vm.buildingId might not be bound when changing the page
    $scope.$watch('buildingDealersVm.buildingId', function(newValue) {
      if (angular.isDefined(newValue)) {
        buildingDealersManager.loadAllBuildingDealers(vm.buildingId).then(
          function(buildingDealers) {
            angular.copy(buildingDealers, vm.buildingDealers);
          }
        );
      }
    });

    angular.extend(vm, {
      list: function (q) {
        return dealer.list(q).then(function (response) {
          return response.data;
        });
      },
      refreshDealers: function (q) {
        vm.list(q).then(function (data) {
          vm.dealers = data;
        });
      },
 
      addDealer: function(dealer) {
        buildingDealersManager.setBuildingDealer({dealerId: dealer.id, buildingId: vm.buildingId, dealer: dealer});
        angular.copy(buildingDealersManager._unsaved(), vm.unsavedBuildingDealers);
      },

      // save changes to dealers list and positions
      saveDealers: function() {
        // for (var i=0; i<vm.addedDealers.length; i++) {
        //   dealer.saveBuildingDealer(vm.buildingId, vm.addedDealers[i]).then(
        //     function(response) {
        //       // console.log('saved dealer: [buildingId:' + vm.buildingId + ', dealerId: ' + vm.addedDealers[i].id + ']');
        //     },
        //     null
        //   );
        // }
      }
    });
  });
