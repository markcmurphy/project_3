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
  }
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


app.controller('LoginModalCtrl', function ($scope, $http) {
  const controller = this;
  this.foundUser = {};
  this.user = " ";
  this.cancel = $scope.$dismiss;

  this.create = function(){
    $http({
      method: 'POST',
      url: '/sessions/register',
      data: {
        email: this.email,
        password: this.password
      }
    }
    )
},
  this.login = function(){
    $http({
      method: 'POST',
      url: '/sessions/login',
      data: {
        email: this.email,
        password: this.password
      }}).then(
          function(response) {
            // console.log(response.data);
            controller.user = response.data;
            // console.log(controller.user);

          },
        function(err) {
          console.log(err);
        }
      );
}
});
