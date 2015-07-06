(function () { 
	'use strict'
	
	var track1 = new AUDIO.Track(212819310);	//getyourrap
	var track2 = new AUDIO.Track(212818447);	//ckann
	var track3 = new AUDIO.Track(212817991);	//babyface
	var count = 0;
	var p = AUDIO.Player;

	p.addTrack(track1);
	p.addTrack(track2);
	p.addTrack(track3);

	//test that ids were set properly
	function testTrackIds () {
		var failure = false;
		if (track1.getId() !== 0) {
			failure = true;
		}

		if (track2.getId() !== 1) {
			failure = true;
		}

		if (track3.getId() !== 2) {
			failure = true;
		}

		if (failure) {
			console.error("FAILURE: test trackIds");
		} else {
			console.log("SUCCESS: test trackIds");
		}

		count++;
	}

	function testNextTrack (callback) {
		var failure = false;
		var currTrack;

		p.init();

		setTimeout(function () { 
			p.nextTrack();
			currTrack = p.getCurrentTrack();
			if (currTrack .getId() !== 1) {
				failure = true;
				console.error("FAILURE: test nextTrack, expected 1, got " + currTrack.getId());
			}
		}, 2000);
		
		setTimeout(function () {
			p.nextTrack();
			currTrack = p.getCurrentTrack();
			if (currTrack.getId() !== 2) {
				failure = true;
				console.error("FAILURE: test nextTrack, expected 2, got " + currTrack.getId());
			}
		}, 4000);

		setTimeout(function () {
			//make sure there is no error when we are at the end of playlist
			p.nextTrack();
			currTrack = p.getCurrentTrack();
			if (currTrack.getId() !== 2) {
				failure = true;
				console.error("FAILURE: test nextTrack, expected 3, got " + currTrack.getId());
			}
		}, 8000);
		
		//log success
		setTimeout(function () {
			if (!failure) {
			console.log("SUCCESS: test nextTrack");
			}
			p.stopTrack();
			count++;
			callback();
		}, 12000);
		
	}

	function testPreviousTrack (callback) {

		var failure = false;
		var end = p.getLength() - 1;
		var currTrack;
		
		p.setCurrentTrack(end);
		p.previousTrack();
		currTrack = p.getCurrentTrack();

		if (currTrack.getId() !== 1) {
			failure = true;
			console.error("FAILURE: test prevTrack, expected 2, got " + currTrack.getId());
		}

		setTimeout(function () {
		p.previousTrack();
			currTrack = p.getCurrentTrack();
			if (currTrack.getId() !== 0) {
				failure = true;
				console.error("FAILURE: test prevTrack, expected 1, got " + currTrack.getId());
			}
		}, 4000);

		setTimeout(function () {
			p.previousTrack();
			currTrack = p.getCurrentTrack();
			if (currTrack.getId() !== 0) {
				failure = true;
				console.error("FAILURE: test prevTrack, expected 0, got " + currTrack.getId());
			}
		}, 8000);

		//log success
		setTimeout(function () {
			if (!failure) {
				console.log("SUCCESS: test prevTrack");
			}
			p.stopTrack()
			count++;
			callback();
		}, 12000);
	}

	function testRemoveTrack (callback) {
		var failure = false;
		var tracks = p.getTrackList();
		
		p.removeTrack(2);

		if (p.getLength() !== 2) {
			failure = false;
			console.error("FAILURE: test removeTrack, expected 2 got " + p.getLength());
		} 

		if(tracks[0].getId() !== 0) {
			failure = false;
			console.error("FAILURE: test removeTrack, expected 0 got " + tracks[0].getId());
		}


		if(tracks[1].getId() !== 1) {
			failure = false;
			console.error("FAILURE: test removeTrack, expected 1 got " + tracks[1].getId());
		}


		if (!failure) {
			console.log("SUCCESS: test removeTrack");
		}

		count++;

		callback();
		
	}

	function testClearPlaylist (callback) {
		p.clearPlaylist();
		if (p.getLength() !== 0) {
			console.error("FAILURE: test clearPlayList, expected 0 got " + p.getLength());
		} else {
			console.log("SUCCESS: test clearPlaylist");
		}
		
		count++;
		callback();
	}

	function expect(num) {
		var failure = false;
		if (count !== num) {
			console.error("Got " + count + " expected " + num);
		} else {
			console.log("Expect " + num);
		}
	}

	$(document).ready(function () {
		testTrackIds();
		//testNextTrack();
		//testPreviousTrack();
		//testRemoveTrack();
		//testClearPlaylist();
		testNextTrack(function () {
			testPreviousTrack(function () {
				testRemoveTrack(function () {
					testClearPlaylist(function () {
						expect(5);
					});
					
				});

			});
		});
	});

})();

