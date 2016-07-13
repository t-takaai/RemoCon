import React from 'react';

const ConditionWindow = (props) => {
  const conditions = props.conditions;

  return (
    <table>
      <thead>
        <tr>
          <th>Temperature</th>
          <th>Humidity</th>
        </tr>
        <tr>
          <td>{conditions.temperature} ℃</td>
          <td>{conditions.humidity} ％</td>
        </tr>
      </thead>
    </table>
  );
};

export default ConditionWindow;
