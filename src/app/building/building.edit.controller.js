angular.module('festima')
  .controller('BuildingEditController', function ($routeParams, $location, toastr, buildingsManager, buildingDealersService) {
      var vm = this;
      var id = $routeParams.buildingId;

      buildingsManager.getBuilding(id).then(
        function (building) {
          vm.building = building;
        },
        function () {
          toastr.info('Объект не найден');
          $location.url('/building/list');
        }
      );
    
      angular.extend(vm, {
        buildingId: id,

        saveChanges: function () {
          // save changes in building properties
          if (vm.buildingId === undefined) {
            vm.building.save().then(function(response) {
              vm.buildingId = response.data.id;
              vm.building = response.data;
              // vm.savePositions();
              $location.path('/building/show/' + vm.building.id);
            });

            return;
          }

          vm.building.update();
          buildingDealersService.savePositions();
          $location.path('/building/show/' + vm.building.id);
        },
      });
    }
  );
