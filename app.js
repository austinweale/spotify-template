var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
      
    })
  }
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});

window.onload = function(){
  $('#search').submit(function(){
        getLocation()
    });
  lastFmTest();
}

function lastFmTest(){
  $.ajax({
   url : "http://ws.audioscrobbler.com/2.0/?user=austinweale&method=user.gettopartists&api_key=ef2f18ff332a62f72ad46c4820bdb11b",
   data : { param : "value" },
   dataType : 'text',
   type : 'get',
   success : function(text) {
   // called after the ajax has returned successful response
   displayLast(text); // alerts the response
 }
});
}

function displayLast(text){
  alert(text);
}

function getCoordinates(city, country){
  /*console.log("https://maps.googleapis.com/maps/api/geocode/json?address=" + city + ",+" + country + "&key=AIzaSyBIFJX-BioTGbdc5g80uSqKCM8EtUdyuqs");
  var ajax = new XMLHttpRequest();
  ajax.onload = displayCoordinates();
  ajax.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + ",+" + country + "&key=AIzaSyBIFJX-BioTGbdc5g80uSqKCM8EtUdyuqs", true);
  ajax.send();*/
  $.ajax({
   url : "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + ",+" + country + "&key=AIzaSyBIFJX-BioTGbdc5g80uSqKCM8EtUdyuqs",
   data : { param : "value" },
   dataType : 'text',
   type : 'get',
   success : function(text) {
   // called after the ajax has returned successful response
   displayCoordinates(text); // alerts the response
 }
});
}

function displayCoordinates(text){
  console.log(text);
  var json = JSON.parse(text);

  var lat = json.results[0].geometry.location.lat;
  var lng = json.results[0].geometry.location.lng;
  console.log(lat + " " + lng);

  $("#location").append("<br>lattitude: " + lat + "<br>" + "longitude: " + lng);
}

function getLocation(){
  var search = $("#input").val();
  console.log(search);
  var ajax = new XMLHttpRequest();
  ajax.onload = display;
  ajax.open("GET", "http://musicbrainz.org/ws/2/artist/?query=artist:" + search +"&fmt=json", true);
  ajax.send();
}

function display(){
  var json = JSON.parse(this.responseText);
  var country = json.artists[0].area.name;

  var city = json.artists[0]["begin-area"].name;
  console.log(city + " " + country);

  $("#location").html(city + ", " + country);

  getCoordinates(city, country);
}
