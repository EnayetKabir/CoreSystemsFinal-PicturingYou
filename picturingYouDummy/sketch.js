//DOM elements
var input, button;
var img;

// Keep track of our socket connection
var socket;

//Bool to show piece
var itsLit = false;

//Sketch variables
var xstart, ystart, squaresize;
var rot = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  img = createImg("http://i.imgur.com/Dg9qKU5.png");
  img.style("align", "center");
  img.position(windowWidth/2 - 247, windowHeight/2 - 250);

  input = createInput();
  input.style("align-content", "center")
  input.position(windowWidth/2 - 68, windowHeight/2 + 170);

  button = createButton('ENTER');
  button.style("align-content", "center");
  button.position(windowWidth/2 - 17, windowHeight/2 + 200);
  button.mousePressed(submitPsswd);

  // Start a socket connection to the server
  socket = io.connect('http://192.168.1.33:8000');

  //from sketch
  xstart = random(10);
  ystart = random(10);
  squaresize = windowHeight/8;
}
      


function draw() {
orNah();

if (itsLit == true){
  removeElements();
  //SHOW THE PIECE
  fill(0, 15);
  noStroke();
  rect(0, 0, windowWidth, windowHeight);

  xstart += 0.009;
  ystart += 0.011;

  translate(windowWidth/2, windowHeight/2);
  push();
  rotate(radians(rot));
  var ynoise = ystart;
  for (var y = -squaresize; y <= squaresize; y+=3) {
    ynoise += 0.02;
    var xnoise = xstart;
    for (var x = -squaresize; x <= squaresize; x+=3) {
      xnoise += 0.02;
      fill(int((randomGaussian()*20)+200), int((randomGaussian()*20)+150), int((randomGaussian()*20)+200));
      drawPoint(x, y, noise(xnoise, ynoise));
      drawPoint(y, x, noise(xnoise+0.03, ynoise+0.04));
        }
      }
  rot += 1.2;
  if (rot == 360) {
    rot = 0;
    }
  pop();
  }
}

function drawPoint(x, y, noiseFactor) {
  push();
  translate(x * noiseFactor * 4, y * noiseFactor * 4);
  var edgeSize = noiseFactor * 25;
  ellipse(0, 0, edgeSize, edgeSize);
  pop();
}

//On Click
function submitPsswd() {
  // Make input field into variable
  var psswd = input.value();
  // Send the variable into the function for sending to socket
  sendPsswd(psswd);
}



// Function for sending to the socket
function sendPsswd(password) {
  // We are sending!
  console.log("passcode we are sending to be checked: " + password);
  
  // Make an object with the password
  var data = {
    passkey: password
  };

  console.log(data.passkey);

  // Send that object to the socket
  socket.emit('checkPass',data);
}


//Function to check password
function orNah() {
  socket.on('weGood',
    // When we receive data
    function(data) {
      console.log("weGood sent:" + data.ParseData.results[0].objectId);
      var timesUsed = data.ParseData.results[0].numOfUses;
      //CHECK FOR BOOL NONELEFT
      if (timesUsed < 3){
      //CHANGE THE BOOL FOR DRAW
        itsLit = true;
      }
    }
  );  
}

