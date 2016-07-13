import React from 'react';
import SwitchArea from './switch_area';

const ControllerTable = (props) => {
  let rows = [];
  let key = '';

  for (key in props.devices) {
    const device = {};
    device[key] = props.devices[key];
    rows.push(
      <SwitchArea key={key} device={device} onDeviceSwitch={props.onDeviceSwitch} />
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Device</th>
          <th>ON/OFF</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default ControllerTable;
