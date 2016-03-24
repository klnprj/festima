'use strict';

angular.module('festima')
  .service('dealer', function($http) {
    angular.extend(this, {
      list: function(q) {
        return $http.get('http://localhost:3000/api/dealers', {params: {q: q}});
      },

      listByIds: function(ids) {
        var params = '?';

        for(var i=0; i<ids.length; i++) {
          params += '&id=' + ids[i];
        }

        return $http.get('http://localhost:3000/api/dealers' + params);
      }
    });
});
