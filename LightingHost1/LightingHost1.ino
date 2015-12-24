#include <RFduinoGZLL.h>

device_t role = HOST;

String P1, P2, mydata;
String dataIn;
String light2String;
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
    light2String = mydata.substring(1,5);
    brightness = light2String.toInt();
    
    analogWrite(LEDpin, brightness);
    
  } else {
    Serial.println("nothing");
  }

  
}

