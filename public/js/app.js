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
        controller.getBooks();
      },
      function(err){
        console.log(err);
      }
    );
  }
//   this.editBook = function(book){
//     $http({
//       method: 'put',
//       url: '/books/' + book._id,
//       data: {
//         title: this.editedTitle,
//         description: this.editedDescription,
//         author: this.editedAuthor
//       }
//     }).then(
//       function(res){
//         controller.getBooks();
//       },
//       function(err){
//         console.log(err);
//       }
//     );
//   },
//   this.deleteBook = function(book){
//     $http({
//       method: 'delete',
//       url: '/books/' + book._id
//     }).then(
//       function(res){
//         controller.getBooks();
//       },
//       function(err){
//         console.log(err);
//       }
//     );
//   }
  this.getHikes();
}]);
