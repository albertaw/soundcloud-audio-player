jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("Player", function () {

	var track1 = new AUDIO.Track(212819310);	//getyourrap
	var track2 = new AUDIO.Track(212818447);	//ckann
	var track3 = new AUDIO.Track(212817991);	//babyface
	var p = AUDIO.Player;

	p.addTrack(track1);
	p.addTrack(track2);
	p.addTrack(track3);
	p.init();

	it("should get and set track ids", function () {
		expect(track1.getId()).toBe(0);
		expect(track2.getId()).toBe(1);
		expect(track3.getId()).toBe(2);
	});
/*
	it("should skip to next track", function (done) {
		var currTrack;
		setTimeout(function () { 
			p.nextTrack();
			//currTrack = p.getCurrentTrack();
			expect(p.getCurrentTrack().getId().toEqual(1));
			track.stop();
			done();
		}, 2000);
	});
*/
	it("should remove tracks", function () {
		var tracks = p.getTrackList();
		p.removeTrack(2);
		expect(p.getLength()).toBe(2);
		expect(tracks[0].getId()).toBe(0);
		expect(tracks[1].getId()).toBe(1);
		
	});

	it("should clear playlist", function () {
		p.clearPlaylist();
		expect(p.getLength()).toBe(0);
	});
});