var interval = 1; // query interval in seconds
var bounceInterval = 15; // label bounce interval in seconds
var username = 'Or1GG1n'; // your Last.FM username
var apiKey = "9c9e57e2d865bd4674bbd61dc147126b";

var root = document.getElementById('root');
var nowPlaying = document.getElementById('nowplaying');
var albumArt = document.getElementById('albumart');
var nowPlayingClip = document.getElementById('nowplayingclip');

var getRecentTracks = function () {
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&nowplaying="true"&user='
    + username + '&api_key=' + apiKey + '&format=json',
    true
  );
  request.onload = processRecentTracks;
  request.send();
};

var processRecentTracks = function () {
  // get JSON object from API
  var data = JSON.parse(this.response);
  console.log(data)
  // set album art
  albumArt.src = data.recenttracks.track[0].image.slice(-1)[0]['#text'];
  // set "now playing" label
  nowPlaying.innerHTML = (
    '<em>'
    + data.recenttracks.track[0].name
    + '</em>&nbsp;by&nbsp;<em>'
    + data.recenttracks.track[0].artist['#text']
    + '</em>'
  );
  // animate if necessary
  var textWidth = nowPlaying.offsetWidth;
  var rootWidth = nowPlayingClip.clientWidth;
  rootWidth -= 2 * parseFloat(getComputedStyle(nowPlayingClip).padding);
  var documentRoot = document.querySelector(':root');
  documentRoot.style.setProperty('--textWidth', textWidth + 'px');
  documentRoot.style.setProperty('--rootWidth', rootWidth + 'px');
  if (textWidth > rootWidth) {
    nowPlaying.style.animation = 'floatText '
    + bounceInterval + 's infinite alternate ease-in-out';
  } else {
    nowPlaying.style.animation = '';
  }
}

getRecentTracks();

setInterval(
  getRecentTracks,
  interval * 1000
);

