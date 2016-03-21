angular.module('festima')
  .controller('BuildingEditController', function($routeParams, buildingService, dealer) {
    var vm = this;
    var id = $routeParams.buildingId;

    buildingService.getBuilding(id).then(
      function(response) {
        vm.building = response.data;
      },
      null
    );

    dealer.listBuildingDealers(id).then(
      function(response) {
        // vm.building.dealers = response.data;
        var list = response.data;
        var ids = [];
        for(var i=0; i<list.length; i++) {
          ids.push(list[i].dealerId);
        }

        dealer.listByIds(ids).then(function(resp) {
          vm.building.dealers = resp.data;
        },
        null
        );
      },
      null
    );

    angular.extend(vm, {

    });
  }
);
