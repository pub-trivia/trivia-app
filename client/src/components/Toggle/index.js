import React from 'react';
import './Toggle.css';

const Toggle = ({isOn, handleToggle}) => {

  const handleToggle = event => {

  }

  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
      style={{ background: isOn && "#9665D8"}}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
      {this.checked ? <h1>Multiple Choice</h1> : <h1>True/False</h1> }
    </>
  );
};

export default Toggle;