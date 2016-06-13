angular.module('festima')
  .service('messages', function($http) {
    angular.extend(this, {
      // list: function(positionId) {
        // return $http.get('http://localhost:3000/api/messages', {params: {positionId: positionId}});
      // }
    });
  }
);
