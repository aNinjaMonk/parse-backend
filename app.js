var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var app = express();
var PORT = process.env.PORT || 2368;
var DB_URL = "mongodb://admin:admin123@ds041506.mlab.com:41506/vikrant";
var APP_ID = "myAppId";
var MASTER_KEY = "myMasterKey";

// || "mongodb://localhost:27017/dev";

var api = new ParseServer({
  databaseURI: DB_URL,
  //cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
  appId: APP_ID,
  masterKey: MASTER_KEY, // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
});

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://parse-backend.herokuapp.com/parse",
      "appId": APP_ID,
      "masterKey": MASTER_KEY,
      "appName": "Sair"
    }
  ],
  "users": [
    {
      "user":"user1",
      "pass":"pass"
    }
  ],
  "useEncryptedPasswords": false
}, options);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
app.use('/dashboard', dashboard);

app.listen(PORT, function() {
  console.log('Server running on port :' + PORT);
});
