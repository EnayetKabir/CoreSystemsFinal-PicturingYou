///Parse data
var Parse = require('node-parse-api').Parse;
var APP_ID = "VvUJBMqX0f8khK4gl4FOzVX9VsI9xcSCESTTm41M";
var MASTER_KEY = "FOu9DmNOOMAeSqkT52vnCB53FOnYKcoZ1atWuZEt";
var appParse = new Parse(APP_ID, MASTER_KEY);

var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost';
var server = app.listen(port);
// WebSockets work with the HTTP server
var io = require('socket.io').listen(server);


///create server
app.use(express.static(__dirname + ''));
console.log('Simple static server listening at '+url+':'+port);

app.get('', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('YOUR SERVER IS RUNNING');
})


// WebSocket Portion:-


// Register a callback function to run when we have an individual connection
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('gimmeData',
      function(info) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: " + info.infoCheck);
        //Search Parse for password
        appParse.find('videoListClass2', function (err, response) {
          var dataFromParse = response;
          console.log('this is dataFromParse:');
          console.log(dataFromParse);
          if (dataFromParse != undefined) {
          socket.emit('youTubez',{ ParseData: dataFromParse });
          }
        });
      }
    );
    
        
    
//DISCONNECT
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
//close socket  
);