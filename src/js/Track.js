/*
Module pattern that returns the constructor
Takes an integer SoundCloud id of the track
Example usage: 
var track = new AUDIO.Track(123456);
track.play();
*/
 
'use strict';
var AUDIO = AUDIO || {};

AUDIO.Track = (function () {
	
	return function (id) {
		var track,
		title,
		trackPermalink,
		userPermalink,
		user,
		duration,
		position,
		volume,
		isMute,
		isPlaying,
		isPaused,
		CLIENT_ID = config.clientId,
		//callback functions to pass to sound object		
		options = {
			autoload: true,

			onplay: function () {
				isPlaying = true;
				draw();
				//AUDIO.UI.update();
			},
			onpause: function () {
				isPlaying = false;
				//AUDIO.UI.update();
			},
			onresume: function () {
				isPlaying = true;
				//AUDIO.UI.update();
			},
			onstop: function () {
				isPlaying = false;
				//AUDIO.UI.update();
			},

			whileloading: function () {
				//todo
				//this.draw();	
			},
			whileplaying: function () {
				//update ui
			},
	    	onfinish: function () {
	    		console.log('song finished');
	    		isPlaying = false;
	    		AUDIO.UI.update();
	    		AUDIO.Player.nextTrack();
	    	},

		};
		
		/* 
		 * PRIVATE METHODS
		 *******************************/
		function draw () {
			$('#track-title').text(title);
			$('#track-title').attr('href', trackPermalink);
		}

		function update () {
		 
		};

		function percentBytes () {
			var bytes = this.bytesLoaded;
			var totalBytes = this.bytesTotal;
			var percent = bytes/totalBytes;
			return percent;
		}

		/*
		 * PUBLIC METHODS
		 *******************************/
		this.init = function () {
			
			SC.initialize({
				client_id: CLIENT_ID
			});

			SC.stream('/tracks/'+ id, options, function (sound) {
				track = sound;
				track.load();
				
			});

			SC.get('http://api.soundcloud.com/tracks/'+ id, function (sound) {
				title = sound.title;
				trackPermalink = sound.permalink_url;
				duration = sound.duration;
			});

		};


		this.play = function () {
			SC.stream('/tracks/'+ id, options, function (sound) {
				track.play();

			});

		};

		this.cleanup = function () {
			track.stop();
			track.setPosition(0);
		};


		this.resume = function () {
			track.resume(id);
			//console.log("resumed");
		};

		this.pause = function () {
			track.pause();
			//console.log("paused");
		};

		this.togglePause = function () {
			track.togglePause();
			//console.log('title - ' + title);
		};

		this.stop = function () {
			track.stop();
		};

		this.mute = function () {
			track.mute();
			isMute = true;
		};

		this.unmute = function () {
			track.unmute();
			isMute = false;
		};

		this.isPlaying = function () {
			return isPlaying;
		};

		this.isMute = function () {
			return isMute;
		};

		/*
		GETTERS AND SETTERS
		**************************************/
		this.getTitle = function () {
			return title;
		};

		this.getUser = function () {
			return track.user.username;
		};

		this.getDuration = function () {
			return duration;
		};

		this.getPosition = function () {
			return position;
		};

		this.setPosition = function (newPosition) {
			position = newPosition;
		};

		this.getVolume = function () {
			return volume;
		};

		this.setVolume = function (newVolume) {
			volume = newVolume;
		};

		//gets soundmanager object id
		this.getId = function () {
			return this.id;
		};

		this.setId = function (newId) {
			this.id = newId;
		};

		this.init();
	}

})();

