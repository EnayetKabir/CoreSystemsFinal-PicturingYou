#include <RFduinoGZLL.h>

device_t role = DEVICE1;

const int pot1 = 2;  //analog x-plane
const int pot2 = 4;  //analog y-plane
const int pot3 = 6;  //dig button
String myString, dataStr;

void setup() {
  Serial.begin(9600);
  
  RFduinoGZLL.txPowerLevel = 0;
  RFduinoGZLL.begin(role);

}

void loop() {
  int a, b, c;
  String astr, bstr, cstr, mydata;
//read data
  a = analogRead(pot1);
  b = analogRead(pot2);
  c = analogRead(pot3);
  
//light1
  
  if (a >= 1000)
  {
    astr = String(a);
  }
  else if (a < 1000 && a >= 100) {
    astr = String(0) + String(a);
  }
  else if (a < 100 && a >=10) {
    astr = String(0) + String(0) + String(a);
  }
  else if (a < 10) {
    astr = String(0) + String(0) + String(0) + String(a);
  }
 
 //light2

  if (b >= 1000)
  {
    bstr = String(b);
  }
  else if (b < 1000 && b >= 100) {
    bstr = String(0) + String(b);
  }
  else if (b < 100 && b >=10) {
    bstr = String(0) + String(0) + String(b);
  }
  else if (b < 10) {
    bstr = String(0) + String(0) + String(0) + String(b);
  }

//light3

  if (c >= 1000)
  {
    cstr = String(c);
  }
  else if (c < 1000 && c >= 100) {
    cstr = String(0) + String(c);
  }
  else if (c < 100 && c >=10) {
    cstr = String(0) + String(0) + String(c);
  }
  else if (c < 10) {
    cstr = String(0) + String(0) + String(0) + String(c);
  }

 //send data
 
  char data[15];

  mydata = "A"+astr+bstr+cstr;
  mydata.toCharArray(data,16);
  myString = String(data);
  dataStr = myString.substring(9,13);
  Serial.println(dataStr);
  
  //RFduinoGZLL.sendToHost(data,16);
  delay(100);

}
