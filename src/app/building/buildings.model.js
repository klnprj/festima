(function(app) {
  'use strict';

  app.factory('Buildings', ['$http', 'appConfig', function($http, appConfig) {
    function Buildings(offset, limit) {
      this.offset = offset;
      this.limit = limit;
    }

    // Buildings.prototype = {
    //   list: function() {
    //     return $http.get(appConfig.apiUrl + '/buildings', {params: {offset: this.offset, limit: this.limit}}).then(function(resp) {
    //       return resp.data;
    //     });
    //   }
    // };

    return Buildings;
  }]);

}(angular.module('festima')));
