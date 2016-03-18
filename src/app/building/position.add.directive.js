angular.module('festima')
  .directive('esPositionAdd', function (positions) {
      return {
        templateUrl: 'app/building/position-add.html',
        scope: {
          dealer: '=',
          newPosition: '=data',
          refresh: '&'
        },
        controller: function () {
          var vm = this;

          angular.extend(vm, {
            addNewPosition: function () {
              positions.create(vm.dealer.id, vm.newPosition).then(function () {
                console.log('successfully saved new position');
                vm.refresh();
              });
            }
          });
        },
        controllerAs: 'vm',
        bindToController: true
      };
  }
);
