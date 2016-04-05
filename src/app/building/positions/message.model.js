angular.module('festima')
  .factory('Message', ['$http', '$q', function ($http, $q) {
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
            $http.post('http://localhost:3000/api/messages', this).then(
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
          $http.delete('http://localhost:3000/api/messages/' + this.id);
        },
        update: function () {
          $http.put('http://localhost:3000/api/messages/' + this.id, this);
        },
      };
      return Message;
    }]
  );
