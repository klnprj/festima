'use strict';

angular.module('festima')
  .controller('BuildingCreateController', function($location, Building, toastr) {
    var vm = this;

    vm.building = new Building();

    vm.saveChanges = function () {
      vm.building.save().then(function (building) {
        vm.buildingId = building.id;
        vm.building = building;
        $location.path('/building/show/' + vm.building.id);
      });

      toastr.success('Новый объект "' + vm.building.name + '" добавлен!');
    };

    vm.onSelectAddress = function(address) {
      vm.addressObject = address;
      vm.building.address = address.full_name;
      vm.building.location = address.geometry.centroid;
    };
  }
);
