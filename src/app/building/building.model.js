angular.module('festima').factory('Building', ['$http', function($http) {
  function Building(data) {
    if (data) {
      this.setData(data);
    }
    // Some other initializations related to book
  };
  Building.prototype = {
    setData: function(data) {
      angular.extend(this, data);
    },
    delete: function() {
      $http.delete('http://localhost:3000/api/buildings/' + id);
    },
    update: function() {
      $http.put('http://localhost:3000/api/buildings/' + id, this);
    },
    // getImageUrl: function(width, height) {
    //   return 'our/image/service/' + this.book.id + '/width/height';
    // },
    // isAvailable: function() {
    //   if (!this.book.stores || this.book.stores.length === 0) {
    //     return false;
    //   }
    //   return this.book.stores.some(function(store) {
    //     return store.quantity > 0;
    //   });
    // }
  };
  return Building;
}]);
