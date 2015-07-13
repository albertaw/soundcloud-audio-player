# SoundCloud JavaScript Player

An audio player that lets you stream songs from your SoundCloud account in a web browser. Features a player UI with a play button, next button, and previous button.

## Getting Started

#### Download files
	$ git clone git@github.com:albertaw/soundcloud-javascript-player.git

#### Get a SoundCloud Client ID
You will need a Client ID to initialize the SDK.  First, create a SoundCloud account: https://soundcloud.com. Register a new application here: http://soundcloud.com/you/apps.  Get the Client ID of the app and replace the value of CLIENT_ID in Tracks.js with your Client ID.

#### Add tracks
This app uses songs from the SoundCloud account [Cerebro Music](https://soundcloud.com/cerebromusic). Get the id of other tracks by going to the track page, click the share link, and under the embed tab copy the code.  The id will be located in the src attribute after `/tracks`.


## Credits
* [SoundCloud](https://developers.soundcloud.com/docs/api/sdks) - Platform for streaming audio
* [Soundmanager 2](http://www.schillmania.com/projects/soundmanager2/) - JavaScript audio API
* [JQuery](https://jquery.com/) - JavaScript library
* [Bootstrap](http://getbootstrap.com/) - HTML, CSS, and JS framework
* [Font Awesome](http://fontawesome.io/) - Font icons
