(function(app) {
  'use strict';

  app.service('dictionaries', function($q, $http, appConfig) {

    var dictionaries = [
      {title: 'Проектные организации', key: 'designers', items: []},
      {title: 'Заказчики', key: 'customers', items: [{name: 'uno'}, {name: 'dos'}]}
    ];

    var dictionariesMap = _.groupBy(dictionaries, 'key');

    angular.extend(this, {
      listAll: function() {
        // return $q.when(dictionaries);
        return $http.get(appConfig.apiUrl + '/dictionaries').then(function(response) {
          return response.data;
        });
      },

      loadByKey: function(key) {
        return $q.when(dictionariesMap[key][0]);
      },

      itemsByKey: function(key, offset, max) {
        var allItems = dictionariesMap[key][0].items;
        var pageItems = angular.copy(allItems).slice(offset, offset + max);
        return $q.when(pageItems);
      },

      countItemsByKey: function(key) {
        return $q.when(dictionariesMap[key][0].items.length);
      },

      addItem: function(key, item) {
        return $q.when(dictionariesMap[key][0].items.push(item));
      }
    });
  });

} (angular.module('festima')));
