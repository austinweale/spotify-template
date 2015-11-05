var lastFmBase = "http://ws.audioscrobbler.com/2.0/"
var googleMapBase = "https://maps.googleapis.com/maps/api/geocode/json"
var musicBrainzBase = "http://musicbrainz.org/ws/2/artist/"
var lastFmKey = "ef2f18ff332a62f72ad46c4820bdb11b"
var googleKey = "AIzaSyBIFJX-BioTGbdc5g80uSqKCM8EtUdyuqs"

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
    $("#location").html("");
    var username = $("#input").val();
    ajaxRequest('true', displayLast, lastFmBase + "?user="+ username + "&method=user.gettopartists&api_key=" + lastFmKey +"&format=json");
    });
  
}

function ajaxRequest(sync, destination, currentUrl){
  $.ajax({
    url : currentUrl,
    data : { param : "value" },
    dataType : 'text',
    async: sync,
    type : 'get',
    success : function(text) {
      // called after the ajax has returned successful response
      destination(text); // alerts the response
    }
  });
}

function displayLast(text){
  var json = JSON.parse(text);
  var artists = json.topartists.artist;
  for(var i = 0; i < 10; i++){
    ajaxRequest('false', display, musicBrainzBase + "?query=artist:" + artists[i].name +"&fmt=json");

  }
}

function getCoordinates(city, country){
  $.ajax({
    url : googleMapBase + "?address=" + city + ",+" + country + "&key=" + googleKey,
    data : { param : "value" },
    dataType : 'text',
    type : 'get',
    async: 'false',
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

  $("#location").append("<br>lattitude: " + lat + "<br>" + "longitude: " + lng );
}

function display(text){
  var json = JSON.parse(text);
  var country = json.artists[0].area.name;

  var city = json.artists[0]["begin-area"].name;
  console.log(city + " " + country);

  $("#location").append(city + ", " + country + "<br>");

  getCoordinates(city, country);
}
