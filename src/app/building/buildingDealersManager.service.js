angular.module('festima')
  .factory('buildingDealersManager', ['$http', '$q', 'BuildingDealer', 'dealer', function ($http, $q, BuildingDealer, dealer) {

    var buildingDealersManager = {
      _pool: {},
      _retrieveInstance: function (id, data) {
        var instance = this._pool[id];

        if (instance) {
          instance.setData(data);
        } else {
          instance = new BuildingDealer(data);
          if (id) {
            this._pool[id] = instance;
          } else {
            var unsavedId = Math.min(-1, Math.min(Object.keys(this._pool)));
            instance.id = unsavedId;
            this._pool[unsavedId] = instance;
          }

        }

        return instance;
      },
      _unsaved: function() {
        var unsaved = [];
        var scope = this;

        Object.keys(this._pool).forEach(function(id) {
          if (Number(id) < 0) {
            unsaved.push(scope._pool[id]);
          }
        });

        return unsaved;
      },
      _search: function (id) {
        return this._pool[id];
      },
      _load: function (id, deferred) {
        var scope = this;

        $http.get('http://localhost:3000/api/buildingDealers/' + id)
          .success(function (data) {
            var item = scope._retrieveInstance(data.id, data);

            $http.get('http://localhost:3000/api/dealers/' + data.dealerId).then(
              function (response) {
                item.dealer = response.data;
              }
            );

            deferred.resolve(item);
          })
          .error(function () {
            deferred.reject();
          });
      },

      getBuildingDealer: function (id) {
        var deferred = $q.defer();
        var item = this._search(id);
        if (item) {
          deferred.resolve(item);
        } else {
          this._load(id, deferred);
        }
        return deferred.promise;
      },
      loadAllBuildingDealers: function (id) {
        var deferred = $q.defer();
        var scope = this;
        $http.get('http://localhost:3000/api/buildingDealers', {params: {buildingId: id}})
          .success(function (itemsArray) {
            var items = [];
            var map = {};
            itemsArray.forEach(function (itemData) {
              var item = scope._retrieveInstance(itemData.id, itemData);
              items.push(item);
              map[item.dealerId] = item;
            });

            return dealer.listByIds(Object.keys(map)).then(
              function (response) {
                var list = response.data;

                list.forEach(function (item) {
                  map[item.id].dealer = item;
                });

                deferred.resolve(items);
              }
            )
          })
          .error(function () {
            deferred.reject();
          });
        return deferred.promise;
      },
      setBuildingDealer: function (data) {
        var scope = this;
        var item = this._search(data.id);
        if (item) {
          item.setData(data);
        } else {
          item = scope._retrieveInstance(null, data);
        }
        return item;
      }
    };

    return buildingDealersManager;
  }]);
