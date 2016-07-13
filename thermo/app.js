const firebase = require('firebase');
const fs = require('fs');
const conditionsInterval = 60000; // 1minutes
const intervalsInterval = 600000; // 10minutes
let dataCounter = 0;
const dataCounterMax = 19;
const config = require('config');
const fbConfig = config.get('fbConfig');
const conditionsConfig = config.get('conditionsConfig');
const temperatureDataFile = conditionsConfig.temperatureDataFile;
const humidityDataFile = conditionsConfig.humidityDataFile;

firebase.initializeApp(fbConfig);

const db = firebase.database();
const databeseRef = db.ref();
const intervalsRef = db.ref('intervals/');

function updateConditions() {

  const temperature = parseFloat(fs.readFileSync(temperatureDataFile));
  const humidity = parseFloat(fs.readFileSync(humidityDataFile));

  databeseRef.update({
    'conditions': {
      'humidity': humidity,
      'temperature': temperature
    }
  });

  console.log('temperature: ' + temperature);
  console.log('humidity: ' + humidity);

}

function updateConditionsTerm() {
  if (dataCounter > dataCounterMax) {
    dataCounter = 0;
  }
  console.log(dataCounter);
  const key = 'data' + dataCounter;
  const date_obj = new Date();
  const temperature = parseFloat(fs.readFileSync(temperatureDataFile));
  const humidity = parseFloat(fs.readFileSync(humidityDataFile));
  const postData = {
    'date': date_obj,
    'humidity': humidity,
    'temperature': temperature
  };
  const updates = {};
  updates[key] = postData;
  console.log(postData);

  intervalsRef.update(updates);

  dataCounter += 1;
}

updateConditions();
setInterval(() => {
  updateConditions();
}, conditionsInterval);

updateConditionsTerm();
setInterval(() => {
  updateConditionsTerm();
}, intervalsInterval);
