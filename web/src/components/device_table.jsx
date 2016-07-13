import React, { Component } from 'react';
import ConditionWindow from './condition_window';
import ControllerTable from './controller_table';
import { firebaseConfig } from '../config/config.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const conditionsRef = db.ref('conditions/').orderByKey();
const devicesRef = db.ref('devices/').orderByKey();

// Device Table
class DeviceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditions: {},
      devices: {}
    };
  }

  // Firebaseからデータを取得
  // 温度と湿度
  fetchInitialConditions() {
    conditionsRef.once('value').then((snapshot) => {
      this.setState({
        conditions: snapshot.val()
      });
    });
  }

  fetchConditions() {
    conditionsRef.on('child_changed', function() {
      this.fetchInitialConditions();
    }.bind(this));
  }

  // デバイス
  fetchInitialDevices() {
    devicesRef.once('value').then((snapshot) => {
      this.setState({
        devices: snapshot.val()
      });
    });
  }

  fetchDevices() {
    devicesRef.on('child_changed', function() {
      this.fetchInitialDevices();
    }.bind(this));
  }

  // 初期化
  componentWillMount() {
    this.fetchInitialDevices();
    this.fetchInitialConditions();
  }

  componentDidMount() {
    this.fetchDevices();
    this.fetchConditions();
  }

  // ボタンが押されたらFirebaseを更新
  handleSelectedDevice(selectedDevice) {
    const keys = Object.keys(selectedDevice);
    const key = keys[0];                                                        // ボタンを押されたデバイス
    const switchison = !selectedDevice[key].switchison;                         // onoff 反転

    const updates = {};
    updates['switchison'] = switchison;
    db.ref('devices/' + key + '/').update(updates);                             // onoff の更新
  }

  // レンダリング
  render() {
    return (
      <div>
        <div className="condition-window">
          <ConditionWindow conditions={this.state.conditions}/>
        </div>
        <div>
          <ControllerTable
            onDeviceSwitch={selectedDevice => this.handleSelectedDevice(selectedDevice)}
            devices={this.state.devices} />
        </div>
      </div>
    );
  }
}

//
// data structure
//
// conditions: {temperature: 24.55, humidity: 50.00}
//
// devices: {
//   aircon: {name: "Air Conditioner", switchison: true},
//   fan: {name: "Circulator", switchison: true},
//   rlamp1: {name: "Room Lamp 1", switchison: false},
//   rlamp2: {name: "Room Lamp 2", switchison: false}
// }

export default DeviceTable;
