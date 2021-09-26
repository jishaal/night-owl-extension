import React from 'react';

import './toggle.css';

type Props = {
    name: string;
    isOn: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

const ToggleSwitch = (props: Props) => {
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
