const app = angular.module('hikeApp', ['ngStorage'])

app.controller('appController', ['$http', function($http) {
  const controller = this;
  this.hikes = [];
  this.edit = 1;
  this.getHikes = function() {
      $http({
        method: 'GET',
        url: '/hikes'
      }).then(
        function(res) {
          controller.hikes = res.data
          console.log(controller.hikes);
        },
        function(err) {
          console.log(err);
        }
      );
    },
    this.createHikes = function() {
      $http({
        method: 'POST',
        url: '/hikes',
        data: {
          hikeName: this.hikeName,
          location: this.location,
          description: this.description,
          waterToConsume: this.waterToConsume,
          clothingToWear: this.clothingToWear
        }
      }).then(
        function(res) {
          controller.getHikes();
        },
        function(err) {
          console.log(err);
        }
      );
    },
    this.editHike = function(hike) {
      $http({
        method: 'PUT',
        url: '/hikes/' + hike._id,
        data: {
          hikeName: this.editedhikeName,
          location: this.editedlocation,
          description: this.editeddescription,
          waterToConsume: this.editedwaterToConsume,
          clothingToWear: this.editedclothingToWear
        }
      }).then(
        function(res) {
          controller.getHikes();
        },
        function(err) {
          console.log(err);
        }
      );
    },

    this.deleteHike = function(hike) {
      $http({
        method: 'DELETE',
        url: '/hikes/' + hike._id
      }).then(
        function(res) {
          controller.getHikes();
        },
        function(err) {
          console.log(err);
        }
      );
    }
  this.getHikes();
}]);

// app.controller('sessionsController', ['$http', function($http){
//   const controller = this;
//   this.getUsers = function(){
//     $http({
//       method: 'GET',
//       url: '/sessions'
//     }).then(
//       function(res){
//         controller.hikes = res.data
//         console.log(controller.sessions);
//       },
//       function(err){
//         console.log(err);
//       }
//     );
//   },
//   this.createUser = function(){
//     $http({
//       method: 'POST',
//       url: '/sessions',
//       data: {
//         userName: this.userName,
//         password: this.password
//       }
//     }).then(
//       function(res){
//         controller.getHikes();
//       },
//       function(err){
//         console.log(err);
//       }
//     );
//   }
//
// }]);







/* Controllers */
app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {

  $scope.signin = function() {
    var formData = {
      email: $scope.email,
      password: $scope.password
    }

    Main.signin(formData, function(res) {
      if (res.type == false) {
        alert(res.data)
      } else {
        $localStorage.token = res.data.token;
        window.location = "/";
      }
    }, function() {
      $rootScope.error = 'Failed to signin';
    })
  };

  $scope.signup = function() {
    var formData = {
      email: $scope.email,
      password: $scope.password
    }

    Main.save(formData, function(res) {
      if (res.type == false) {
        alert(res.data)
      } else {
        $localStorage.token = res.data.token;
        window.location = "/"
      }
    }, function() {
      $rootScope.error = 'Failed to signup';
    })
  };

  $scope.me = function() {
    Main.me(function(res) {
      $scope.myDetails = res;
    }, function() {
      $rootScope.error = 'Failed to fetch details';
    })
  };

  $scope.logout = function() {
    Main.logout(function() {
      window.location = "/"
    }, function() {
      alert("Failed to logout!");
    });
  };
  $scope.token = $localStorage.token;
}])

app.factory('Main', ['$http', '$localStorage', function($http, $localStorage) {
  var baseUrl = "localhost:3000";

  function changeUser(user) {
    angular.extend(currentUser, user);
  }

  function urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  function getUserFromToken() {
    var token = $localStorage.token;
    var user = {};
    if (typeof token !== 'undefined') {
      var encoded = token.split('.')[1];
      user = JSON.parse(urlBase64Decode(encoded));
    }
    return user;
  }

  var currentUser = getUserFromToken();

  return {
    save: function(data, success, error) {
      $http.post(baseUrl + '/signin', data).success(success).error(error)
    },
    signin: function(data, success, error) {
      $http.post(baseUrl + '/authenticate', data).success(success).error(error)
    },
    me: function(success, error) {
      $http.get(baseUrl + '/me').success(success).error(error)
    },
    logout: function(success) {
      changeUser({});
      delete $localStorage.token;
      success();
    }
  };
}]);
