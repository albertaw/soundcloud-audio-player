/*
Singleton module pattern with closures.  
Manages track objects and playing songs

Example usage:
AUDIO.Player.addTrack(new AUDIO.Track(12345));
AUDIO.Player.playPlaylist();
*/

'use strict';

AUDIO.Player = (function () {

	var currentTrack,
		//maintains a playlist of songs to be cycled.
		tracks = [],
		trackVolume,
		//is the current playing song looping
		isLooping,
		//to assign to tracks
		nextId = 0,

		//SoundCloud authentication
		CLIENT_ID = config.clientId;
		
		function trackExists (id) {
			if (tracks[id]) {
				return true;
			} else {
				return false;
			}
		};

		function hasNextTrack () {
			var currentIndex = tracks.indexOf(currentTrack);
			var end = tracks.length - 1;
			if (currentIndex < end) {
				return true;
			} 
			return false;
		}

		function hasPreviousTrack () {
			var currentIndex = tracks.indexOf(currentTrack);
			if (currentIndex > 0) {
				return true;
			}
			return false;
		}
	
	return {

		getCurrentTrack: function () {
			return currentTrack;
		},

		setCurrentTrack: function (track) {
			currentTrack = tracks[track];
		},

		getTrackList: function () {
			return tracks;
		},

		addTrack: function (track) {
			//track.init();
			track.setId(nextId);
			tracks.push(track);
			nextId++;
		},

		//for now the id corresponds to the index
		removeTrack: function (id) {
			if(trackExists(id)) {
				tracks.splice(id, 1);
			}
		},

		
		playTrack: function () {
			currentTrack.togglePause();
		},

		pauseTrack: function () {
			currentTrack.pause();
		},

		resumeTrack: function () {
			currentTrack.resume();
		},

		stopTrack: function () {
			currentTrack.stop();
		},

		nextTrack: function () {
			var currentIndex = tracks.indexOf(currentTrack);
			var nextTrack = currentIndex + 1;
			if (hasNextTrack()) {	
				if (currentTrack.isPlaying()) {
					currentTrack.stop();
				}
				currentTrack = tracks[nextTrack];		
				currentTrack.play();
				
			} else {
				return;
				//disable next button
			}

			//console.log('next track');
		},

		previousTrack: function () {
			var currentIndex = tracks.indexOf(currentTrack);
			var prevTrack = currentIndex - 1;
			if (hasPreviousTrack()) {	//if we are at the beginning
				if (currentTrack.isPlaying()) {
					currentTrack.stop();
				}
				currentTrack = tracks[prevTrack];
				currentTrack.play();
			
			} else {
				return;
				//disable next button
			}

			//console.log('previous track');
		},

		playPlaylist: function () {
			while (hasNextTrack()) {
				//on finish 
				//nextTrack();
			}
		},

		shufflePlaylist: function () {
			//TODO
		},

		clearPlaylist: function () {
			tracks.length = 0;
		},

		getLength: function () {
			return tracks.length;
		},

		isPlaying: function () {
			console.log('player says track is playing');
			return currentTrack.isPlaying();
		},

		isPaused: function () {
			console.log('player says track is paused');
			return currentTrack.paused;
		},

		init: function () {

			SC.initialize({
				client_id: CLIENT_ID
			});

			currentTrack = tracks[0];
			console.log('Player initiated');
		},

		update: function () {

		},

		draw: function () {

		},

		cleanup: function () {
			
		},

	}

	
})(); 


