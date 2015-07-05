/*
Module pattern that returns the constructor
@param id the SoundCloud id of the track
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
		user,
		duration,
		position,
		volume,
		isMute,
		isPlaying,
		isPaused,
		ID,	//object id
		
		options = {
			autoload: true,

			onplay: function () {
				isPlaying = true;
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
				position = track.position; 

				$('#bytes').text(percentBytes);
			},

	    	onfinish: function () {
	    		console.log('song finished');
	    		isPlaying = false;
	    		AUDIO.UI.update();
	    		AUDIO.Player.nextTrack();
	    	}
		};

		this.percentBytes = function () {
			var bytes = this.bytesLoaded;
			var totalBytes = this.bytesTotal;
			var percent = bytes/totalBytes;
			return percent;
		};

		this.update = function () {
		 
		};

		this.draw = function () {
			$('#bytes').text(percentBytes());
		};

		this.init = function () {

			SC.stream('/tracks/'+ id, options, function (sound) {
				track = sound;
				track.load();
				//track.setVolume(10);
			});
		};

		this.play = function () {
			SC.stream('/tracks/'+ id, options, function (sound) {
				track.play();
			});
		};

		this.cleanup = function () {
			track.destruct();
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

		/*
		GETTERS AND SETTERS
		**************************************/
		this.getTitle = function () {
			return track.title;
		};

		this.getUser = function () {
			return track.user.username;
		};

		this.getDuration = function () {
			return track.duration;
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

		this.isPlaying = function () {
			return isPlaying;
		};

		this.isMute = function () {
			return isMute;
		};

		this.getId = function () {
			return ID;
		};

		this.setId = function (newId) {
			ID = newId;
		};

		this.init();
	}

})();

