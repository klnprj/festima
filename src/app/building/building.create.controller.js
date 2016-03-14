'use strict';

angular
  .module('festima')
  .controller('BuildingCreateController', function($location, toastr, buildingService) {
    var vm = this;

    angular.extend(vm, {
      save: function() {
        buildingService.save(vm.name, vm.address, vm.client, vm.project, vm.manager).then(
          function() {
            $location.path('/');
            toastr.success('Новый объект "' + vm.name + '" добавлен!')
          },
          null
        );
      }
    });
});
