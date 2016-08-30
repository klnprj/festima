(function(app) {
  'use strict';

  app.service('dictionaries', function($q, $http) {

    var dictionaries = {
      customers: {title: 'Заказчики', key: 'customers', items: [{name: 'uno'}, {name: 'dos'}]}
    };

    angular.extend(this, {
      listAll: function() {
        return $q.when([{title: 'Заказчики', key: 'customers'}, {title: 'Проектные организации', key: 'designers'}]);
      },

      loadByKey: function(key) {
        return $q.when(dictionaries[key]);
      },

      itemsByKey: function(key, offset, max) {
        return $q.when(dictionaries[key].items.slice(offset, offset + max));
      },

      addItem: function(key, item) {
        return $q.when(dictionaries[key].items.push(item));
      }
    });
  });

} (angular.module('festima')));
