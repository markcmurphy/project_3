const app = angular.module('hikeApp', [])

app.controller('appController', ['$http', function($http){
  const controller = this;
  this.toggle = true;
  this.message = 'Weather is....',
  this.cityTemps = {},
  this.hikes  = [],
  this.edit = 1,
  this.toggleView =  () => {
   this.toggle = !this.toggle;
 };
  this.getHikes = function(){
    $http({
      method: 'GET',
      url: '/hikes'
    }).then(
      function(res){
        controller.hikes = res.data
        console.log(controller.hikes);
      },
      function(err){
        console.log(err);
      }
    );
  },
  this.createHikes = function(){
    $http({
      method: 'POST',
      url: '/hikes',
      data: {
        Id: this._id,
        hikeName: this.hikeName,
        location: this.location,
        description: this.description,
        waterToConsume: this.waterToConsume,
        clothingToWear: this.clothingToWear
      }
    }).then(
      function(res){
        controller.getHikes();
      },
      function(err){
        console.log(err);
      }
    );
  },
  this.editHike = function(hike){
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
      function(res){
        controller.getHikes();
      },
      function(err){
        console.log(err);
      }
    );
  },
  this.deleteHike = function(hike){
    $http({
      method: 'DELETE',
      url: '/hikes/' + hike._id
    }).then(
      function(res){
        controller.getHikes();
      },
      function(err){
        console.log(err);
      }
    );
  },

  this.getWeather = function() {
    console.log('called')
      $http({
          method: 'GET',
          url: '/weather'
      }).then(
          function(response){
              console.log(response, ' this is response')
              controller.message = response.data.main.temp + "°F in " + response.data.name
              // $scope.photos = response
          },
          function(err){
              console.log(err);
          }
      );
  }
  // end of this.getWeather

  this.postWeather = function() {
    console.log('called')
    const data = {
      city: controller.query
    }
    console.log(controller.query, 'post')
    $http({
      method: 'POST',
      url: '/weather',
      data: data

    }).then(
      function(response) {
        console.log(response, ' this is response from post')
        controller.message = response.data.main.temp + "°F in " + response.data.name
        // $scope.photos = response

      },
      function(err) {
        console.log(err);
      }
    );
  }
// end of this.postWeather

this.getWeatherByCity = function(hike) {
console.log(hike);
  $http({
      method: 'GET',
      url: '/hikes' + '/byCity/' + hike,
  }).then(
      function(response) {
        controller.cityTemps[response.data.name] = response.data.main.temp + "°F in " + response.data.name;

      },
      function(err){
          console.log(err);
      }
  );
}
// // end of this.getWeather
// this.getOne = function ( hike ){
//          currentHike = hike;
//   this.showOne = {
//     Id: this._id,
//     hikeName: this.hikeName,
//     location: this.location,
//     description: this.description,
//     waterToConsume: this.waterToConsume,
//     clothingToWear: this.clothingToWear
//      };
//      console.log(this.showOne.id);
//        }

this.getHikes();
}]);
// end of weather controller

// authentication

app.run(function ($rootScope, $state, loginModal) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();

      loginModal()
        .then(function () {
          return $state.go(toState.name, toParams);
        })
        .catch(function () {
          return $state.go('welcome');
        });
    }
  });
});


app.config(function ($stateProvider) {

  $stateProvider
    .state('welcome', {
      url: '/welcome',
      // ...
      data: {
        requireLogin: false
      }
    })
    .state('app', {
      abstract: true,
      // ...
      data: {
        requireLogin: true // this property will apply to all children of 'app'
      }
    })
    .state('app.dashboard', {
      // child state of `app`
      // requireLogin === true
    })

});

app.config(function ($httpProvider) {

  $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
    var loginModal, $http, $state;

    // this trick must be done so that we don't receive
    // `Uncaught Error: [$injector:cdep] Circular dependency found`
    $timeout(function () {
      loginModal = $injector.get('loginModal');
      $http = $injector.get('$http');
      $state = $injector.get('$state');
    });

    return {
      responseError: function (rejection) {
        if (rejection.status !== 401) {
          return rejection;
        }

        var deferred = $q.defer();

        loginModal()
          .then(function () {
            deferred.resolve( $http(rejection.config) );
          })
          .catch(function () {
            $state.go('welcome');
            deferred.reject(rejection);
          });

        return deferred.promise;
      }
    };
  });

});
