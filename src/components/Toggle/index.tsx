import React from 'react';

import './toggle.css';

const ToggleSwitch = (props) => {
    return (
        <div className={`toggle ${props.className ? props.className : ''}`}>
            <input
                className="toggle-input"
                name={props.name}
                type="checkbox"
                checked={props.isOn}
                onChange={props.onChange}
            />
            <div className="toggle-button" />
        </div>
    );
};

export default ToggleSwitch;
