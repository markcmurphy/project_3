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
