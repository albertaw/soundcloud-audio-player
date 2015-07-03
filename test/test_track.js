(function () { 
	'use strict'
	var count = 0;

	function testPlay () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		
		track.play();
		
		setTimeout(function () {
			if (!track.isPlaying()){
				failue = true;
				console.error("FAILURE: test play");
			} else {
				console.log("SUCCESS: test play");
			}
			track.stop();
		}, 3000);

		count++;
	}


	function testPause () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		track.play();

		setTimeout(function () {
			track.pause();
			if (track.isPlaying()){
				failue = true;
				console.error("FAILURE: test pause");
			} else {
				console.log("SUCCESS: test pause");
			}
			track.stop();
		}, 3000);

		count++;
	}

	function testResume () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		track.play();

		setTimeout(function () {
			track.pause();
		}, 3000);

		setTimeout(function () {
			track.resume();
			if (!track.isPlaying()){
				failue = true;
				console.error("FAILURE: test resume");
			} else {
				console.log("SUCCESS: test resume");
			}
			track.stop();
		}, 6000);

		count++;
	}

	function testMute () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		track.play();
		setTimeout(function () {

			track.mute();
			
			if (!track.isMute()){
				failue = true;
				console.error("FAILURE: test mute- not muted");
			} 
			track.unmute();
			if (track.isMute()){
				failue = true;
				console.error("FAILURE: test mute- is muted");
			} 
			if (!failure) {
				console.log("SUCCESS: test mute");
			}
			track.stop();

		}, 2000);

		count++;
	}

	function testVolume () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		track.play();
		setTimeout(function () {
			track.setVolume(50);
			if (track.getVolume() !== 50){
				failue = true;
				console.error("FAILURE: test volume");
			} else {
				console.log("SUCCESS: test volume");
			}
			track.stop();
		}, 3000);

		count++;
	}

	function testPosition () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		track.setPosition(10000)
		if (track.getPosition() !== 10000){
			failue = true;
			console.error("FAILURE: test position");
		} else {
			console.log("SUCCESS: test position");
		}

		count++;
	}

	function testDuration () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		track.play();
		setTimeout(function () {
			//console.log(track.getDuration());
			track.stop();
			if (!track.getDuration()) {
				failure = true;
			}
		},8000);

		if (failure) {
			console.error("FAILURE: test duration");
		} else {
			console.log("SUCCESS: test duration");
		}

		count++;
	}

	function testId () {
		var failure = false;
		var track = new AUDIO.Track(115949676);
		track.setId(0);
		if (track.getId() === 0) {
			console.log("SUCCESS: test id");
		} else {
			failue = true;
			console.error("FAILURE: test position");
		}

		count++;
	}

	//make sure 7 tests were called
	function expect(num) {
		var failure = false;
		if (count !== num) {
			console.error("Got " + count + " expected " + num);
		} else {
			console.log("Expect " + num);
		}
	}

	$(document).ready(function () {

		testPlay()
		testPause();
		testResume();
		testMute();
		testVolume();
		testPosition();
		testDuration();
		testId();
		expect(8);

	});
})();