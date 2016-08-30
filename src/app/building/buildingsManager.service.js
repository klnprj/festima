angular.module('festima')
  .factory('buildingsManager', ['$http', '$q', 'appConfig', 'Building', 'usersManager', function($http, $q, appConfig, Building, usersManager) {
  var buildingsManager = {
    _pool: {},
    _retrieveInstance: function(id, data) {
      var instance = this._pool[id];

      if (instance) {
        instance.setData(data);
      } else {
        instance = new Building(data);
        this._pool[id] = instance;
      }

      return instance;
    },
    _search: function(id) {
      return this._pool[id];
    },
    _load: function(id, deferred) {
      var scope = this;

      $http.get(appConfig.apiUrl + '/buildings/' + id)
        .success(function(data) {
          var itemData = data;
          var item;

          usersManager.getUser(itemData.author.id).then(function(data) {
            // delete itemData.authorId;
            itemData.author = data;
            item = scope._retrieveInstance(itemData.id, itemData);
            deferred.resolve(item);
          });

          deferred.resolve(item);

        })
        .error(function() {
          deferred.reject();
        });
    },

    getBuilding: function(id) {
      var deferred = $q.defer();
      var item = this._search(id);
      if (item) {
        deferred.resolve(item);
      } else {
        if (id === undefined) {
          deferred.resolve(this._retrieveInstance(null));
        } else {
          this._load(id, deferred);
        }
      }
      return deferred.promise;
    },

    loadAllBuildings: function() {
      var deferred = $q.defer();
      var scope = this;
      $http.get(appConfig.apiUrl + '/buildings')
        .success(function(itemsArray) {
          var items = [];
          var item;

            if (itemsArray.length == 0) {
              deferred.resolve([]);
              return;
            }

            itemsArray.forEach(function (itemData) {
              usersManager.getUser(itemData.author.id).then(function (data) {
                // delete itemData.authorId;
                itemData.author = data;
                item = scope._retrieveInstance(itemData.id, itemData);
                items.push(item);
              }).then(function () {
                deferred.resolve(items);
              });
            });
        })
        .error(function() {
          deferred.reject();
        });
      return deferred.promise;
    },

    setBuilding: function(data) {
      var scope = this;
      var item = this._search(data.id);
      if (item) {
        item.setData(data);
      } else {
        item = scope._retrieveInstance(data);
      }
      return item;
    }
  };

  return buildingsManager;
}]);
