const firebase = require('firebase');
const exec = require('child_process').exec;
const config = require('config');

firebase.initializeApp(config);

// Assume we have the following data in our database:
// {
//   aircon: { name: 'Air Conditioner', switchison: true },
//   fan: { name: 'Circulator', switchison: true }
// }

const db = firebase.database();
const ref = db.ref('devices');

ref.on('child_changed', function(snapshot) {
  const changedDevice = snapshot.key;
  const switchIsOn = snapshot.child('switchison').val();
  const onoff = switchIsOn ? 'on' : 'off';
  const command = 'bin/playdata bin/data/' + changedDevice + '_' + onoff + '.json';
  exec(command, function(err, stdout, stderr) {
    if (!err) {
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
    } else {
      console.log(err);
    }
  });
});
