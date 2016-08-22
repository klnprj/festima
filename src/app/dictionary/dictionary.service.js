(function(app) {
  'use strict';

  app.service('dictionaries', function($q, $http) {

    angular.extend(this, {
      listAll: function() {
        return $q.when([{title: 'Заказчики', key: 'customers'}, {title: 'Проектные организации', key: 'designers'}]);
      },

      loadByKey: function(key) {
        return $q.when({title: 'Заказчики', key: 'customers', items: [{name: 'uno'}, {name: 'dos'}]});
      }
    });
  });

} (angular.module('festima')));
