'use strict';

angular.module('festima')
  .service('dealers', function($http, appConfig) {
    angular.extend(this, {

      findAllByQuery: function(q) {
        return $http.get(appConfig.apiUrl + '/dictionaries/dealers/items', {params: {q: q}}).then(function(resp) { return resp.data; });
      },

      listAll: function() {
        return $http.get(appConfig.apiUrl + '/dictionaries/dealers/items').then(function(response) { return response.data; });
      },

      mapAll: function() {
        return this.listAll().then(function(dealerList) {
          var dealersMap = {};
          var dealer;

          for (var i = 0; i < dealerList.length; i++) {
            dealer = dealerList[i];
            if (angular.isUndefined(dealersMap[dealer.id])) {
              dealersMap[dealer.id] = dealer;
            }
          }

          return dealersMap;
        });
      },

      listByIds: function(ids) {
        var params = '?';

        for(var i=0; i<ids.length; i++) {
          params += '&id=' + ids[i];
        }

        return $http.get(appConfig.apiUrl + '/dictionaries/dealers/items' + params);
      }
    });
});
