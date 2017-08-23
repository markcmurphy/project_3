$(document).ready(function() {
    // all custom jQuery will go here
    const images = [

  'http://cd.visitmelbourne.com/-/media/images/great-ocean-road/things-to-do/outdoor-activities/walking-and-hiking/hiking-great-ocean-walk_gor_r_1374435_1150x863.jpg?ts=20150625031118&w=480&h=360&crop=1|http://cd.visitmelbourne.com/-/media/images/great-ocean-road/things-to-do/outdoor-activities/walking-and-hiking/hiking-great-ocean-walk_gor_r_1374435_1150x863.jpg?ts=20150625031118&w=720&h=540&crop=1',
  'https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg',
  'http://az616578.vo.msecnd.net/files/2016/06/25/6360243057518096701592067658_191013.jpg',
  'http://az616578.vo.msecnd.net/files/2016/06/30/636028626429115563-686613358_hikers3.jpg'

];

let index = 0;

setInterval(change_up, 20000);

function change_up(){

  index = (index + 1 < images.length) ? index + 1 : 0;

  $('.block').fadeOut(2000, function(){

    $(this).css('background-image', 'url('+ images[index] + ')')

    $(this).fadeIn(2000);

  });
}


});
