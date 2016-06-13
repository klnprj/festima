angular.module('festima')
  .factory('Message', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
      function Message(data) {
        if (data) {
          this.setData(data);
        }
        // some init
      };

      Message.prototype = {
        setData: function (data) {
          angular.extend(this, data);
        },
        save: function () {
          var deferred = $q.defer();
          var self = this;

          if (this.id === undefined) {
            $http.post(appConfig.apiUrl + '/messages', this).then(
              function(response) {
                angular.extend(self, response.data);
                deferred.resolve(self.id)
              },
              function(response) {
                deferred.reject();
              }
            );
          } else {
            this.update();
            deferred.resolve(this.id);
          }

          return deferred.promise;
        },
        delete: function () {
          $http.delete(appConfig.apiUrl + '/messages/' + this.id);
        },
        update: function () {
          $http.put(appConfig.apiUrl + '/messages/' + this.id, this);
        },
      };
      return Message;
    }]
  );
