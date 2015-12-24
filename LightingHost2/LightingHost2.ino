#include <RFduinoGZLL.h>

device_t role = HOST;

String P1, P2, mydata;
String dataIn;
String light1String;
int LEDpin = 4;
int brightness;

void setup() {

  Serial.begin(9600);
  RFduinoGZLL.begin(role);
  
}

void loop() {

  Serial.begin(9600);
  RFduinoGZLL.begin(role);
  
}

void RFduinoGZLL_onReceive(device_t device, int rssi, char *data, int len){
  //Serial.println(data);
  dataIn = String(data[0]);
  
  if (dataIn == "A"){
    //convert data to string
    mydata = String(data);
    //extract only the part needed for light 1
    light1String = mydata.substring(5,9);
    brightness = light1String.toInt();
    
    analogWrite(LEDpin, brightness);
    
  } else {
    Serial.println("nothing");
  }

  
}

