angular.module('festima').factory('BuildingDealer', ['$http', function($http) {
  function BuildingDealer(data) {
    if (data) {
      this.setData(data);
    }
    // Some other initializations related to book
  };
  BuildingDealer.prototype = {
    setData: function(data) {
      angular.extend(this, data);
    },
    save: function() {
      if (this.id === undefined) {
        $http.post('http://localhost:3000/api/buildingDealers', this);
        $http.get('http://localhost:3000/api/buildingDealers').then(
          function(response) {
            angular.extend(this, response.data);
          }
        )
      } else {
        this.update();
      }
    },
    delete: function() {
      $http.delete('http://localhost:3000/api/buildingDealers/' + id);
    },
    update: function() {
      $http.put('http://localhost:3000/api/buildingDealers/' + id, this);
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
  return BuildingDealer;
}]);
