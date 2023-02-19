const { 
  MatrixClient,
  AutojoinRoomsMixin,
  SimpleFsStorageProvider,
  RustSdkCryptoStorageProvider
} = require("matrix-bot-sdk");
require('dotenv').config()

// This will be the URL where clients can reach your homeserver. Note that this might be different
// from where the web/chat interface is hosted. The server must support password registration without
// captcha or terms of service (public servers typically won't work).
const homeserverUrl = process.env.HOMESERVER_URL;

// Use the access token you got from login or registration above.
const accessToken = process.env.ACCESS_TOKEN;

// In order to make sure the bot doesn't lose its state between restarts, we'll give it a place to cache
// any information it needs to. You can implement your own storage provider if you like, but a JSON file
// will work fine for this example.
const storage = new SimpleFsStorageProvider("hello-bot.json");
const cryptoProvider = new RustSdkCryptoStorageProvider("./")

// Finally, let's create the client and set it to autojoin rooms. Autojoining is typical of bots to ensure
// they can be easily added to any room.
const client = new MatrixClient(homeserverUrl, accessToken, storage, cryptoProvider);

AutojoinRoomsMixin.setupOnClient(client);

module.exports = client;