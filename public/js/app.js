const app = angular.module('hikeApp', [])

app.controller('appController', ['$http', function($http){
  const controller = this;
  this.hikes  = [];
  this.edit = 1;
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
  this.getHikes();
}]);


// beginning of weather controller
app.controller('WeatherCtrl', ['$http', function($http){
    const controller = this;
    this.message = '',
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


}]);
// end of weather controller
