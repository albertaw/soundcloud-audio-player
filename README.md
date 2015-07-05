## SoundCloud JavaScript Web Player

SoundCloud is a platform that lets users upload audio content.  This app creates an audio player that lets you add songs from your SoundCloud account and stream them in a web browser.  

### Getting Started

##### 1. Add the SoundCloud JavaScript SDK to your HTML document.<br>
`<script src="//connect.soundcloud.com/sdk.js"></script>`

##### 2. Get a SoundCloud Client ID
You will need a Client ID to initialize the SDK.  First, create a SoundCloud account: https://soundcloud.com. Register a new application here: http://soundcloud.com/you/apps.  Get the Client ID of the app and replace the value of CLIENT_ID in Tracks.js with your Client ID.

##### 3. Add tracks
This app uses songs from our SoundCloud account https://soundcloud.com/cerebromusic. Get the id of other tracks by going to the track page, click the share link, under the embed tab copy the code.  The id will be located in the src attribute after `/tracks`.


