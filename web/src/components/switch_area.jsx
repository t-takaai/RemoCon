import React from 'react';

const SwitchArea = ({device, onDeviceSwitch}) => {
  const keys = Object.keys(device);                                             // deviceのkeyのarray (要素は1つ)
  const key = keys[0];                                                          // deviceのkey
  const name = device[key].name;
  const bgcolor = device[key].switchison ? 'red' : 'gray' ;
  const onoff = device[key].switchison ? 'ON' : 'OFF' ;

  return (
      <tr>
        <td>{name}</td>
        <td>
          <button onClick={() => onDeviceSwitch(device)} style={{background: bgcolor}}>{onoff}</button>
        </td>
      </tr>
  );
};

export default SwitchArea;
