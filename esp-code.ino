//this program is developed by Atom Developoers || for the project of turbo motor application || created by Abhijith S Pillai
//
//
//
#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <ArduinoJson.h>
//


#define FIREBASE_HOST "https://turbo-motor-f9781.firebaseio.com/"
#define FIREBASE_AUTH "ocPAQHye97MgsJKWqF0ykG0YNUyqQpOh5pKn7xbe"
const char* ssid     = "Ooredoo-E5377-E0BA";
const char* password ="admin123";

#define stsTocken 32 //from turbo app--to motor
int val1;

#define msgTocken 13 //from hardware ---to app
int val2;

#define ovCrTocken 27 //from hardware ---to app
int val3;

#define crStsTocken 35 //from hardware ---to app
int val4;
WiFiServer server(80);
void setup()
{
    Serial.begin(115200);                             /// Select the same baud rate if you want to see the datas on Serial Monitor
    pinMode(stsTocken,OUTPUT);
    pinMode(msgTocken,INPUT);
    pinMode(ovCrTocken,INPUT);
    pinMode(crStsTocken,INPUT);
    pinMode(LED_BUILTIN, OUTPUT);

    digitalWrite(stsTocken,LOW);
    digitalWrite(msgTocken,LOW);
    digitalWrite(ovCrTocken,HIGH);
    digitalWrite(crStsTocken,LOW);
    // We start by connecting to a WiFi network

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
        //digitalWrite(LED_BUILTIN, HIGH);
    }

    Serial.println("");
    Serial.println("WiFi connected.");
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    
    server.begin();
    Serial.println("ESP32 Touch Test");
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}


void loop(){
  //
  // motor on of event handler
 //
 //
           val1=Firebase.getInt("sCominication/stsFlag");                          //Reading the value of the varialble Status from the firebase
            
           if(val1==1)                                                             // If, the Status is 1, turn on the Relay1
              {
                digitalWrite(stsTocken,HIGH);
                Serial.println("motor is on");
                //digitalWrite(LED_BUILTIN, HIGH);
             }
             else if(val1==0)                                                      // If, the Status is 0, turn Off the Relay1
             {                                      
                digitalWrite(stsTocken,LOW);
                Serial.println("motor  OFF");
               // digitalWrite(LED_BUILTIN, LOW);
             }
//
//
//feed back section
             val2 =digitalRead(msgTocken);
             if(val2==HIGH)
             {
              Firebase.setInt("hCominication/returnFlag",0);
             }else if(val2==LOW)
             {
              Firebase.setInt("hCominication/returnFlag",1);
             }        
 
  //curret status flag
          val4 =digitalRead(crStsTocken);
//
//
           if(val4==HIGH)
           {
              Firebase.setInt("crtSts/crtStsFlag",1);
          
           }
           else if(val4==LOW)
           {
            Firebase.setInt("crtSts/crtStsFlag",0);
           }

 // 
// over current protection
 
 
 val3=digitalRead(ovCrTocken);
// //
// //
 if(val3==LOW)
 {
    Firebase.setInt("sCominication/stsFlag",0);
    Firebase.setInt("overCrt/overFlag",1);
   digitalWrite(stsTocken,LOW);
 }
// //
}
