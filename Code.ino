//Gas sensor pin
const int GAS_SENSOR_PIN = A0;

//Temperature sensor pin
const int TEMP_SENSOR_PIN = A1;

//Relay pins for lights and fan
const int LIGHT_RELAY_PIN = 2;
const int FAN_RELAY_PIN = 3;

//Thresholds for gas and temperature
const int GAS_THRESHOLD = 200; //change this value to the appropriate gas sensor reading
const int TEMP_THRESHOLD = 25; //change this value to the desired temperature threshold

void setup() {
  //initialize serial communication
  Serial.begin(9600);

  //set up relay pins as output
  pinMode(LIGHT_RELAY_PIN, OUTPUT);
  pinMode(FAN_RELAY_PIN, OUTPUT);
}

void loop() {
  //read gas sensor value
  int gasSensorValue = analogRead(GAS_SENSOR_PIN);

  //check if gas sensor reading is above threshold
  if (gasSensorValue > GAS_THRESHOLD) {
    //send alert message via serial
    Serial.println("Gas leak detected!");
  }

  //read temperature sensor value
  int tempSensorValue = analogRead(TEMP_SENSOR_PIN);

  //convert temperature sensor value to Celsius
  float temperatureC = (5.0 * tempSensorValue * 100.0) / 1024.0;

  //check if temperature is above threshold
  if (temperatureC > TEMP_THRESHOLD) {
    //turn on fan
    digitalWrite(FAN_RELAY_PIN, HIGH);`
  } else {
    //turn off fan
    digitalWrite(FAN_RELAY_PIN, LOW);
  }

  //turn on lights if gas leak is detected
  if (gasSensorValue > GAS_THRESHOLD) {
    digitalWrite(LIGHT_RELAY_PIN, HIGH);
  } else {
    digitalWrite(LIGHT_RELAY_PIN, LOW);
  }

  //print gas and temperature values via serial
  Serial.print("Gas: ");
  Serial.print(gasSensorValue);
  Serial.print(" Temperature: ");
  Serial.print(temperatureC);
  Serial.println("C");

  //wait for 1 second
  delay(1000);
}
