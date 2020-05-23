import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <div className="Button">
      <button 
        className={`button ${props.classes}`}
        name={props.name}
        type={props.type}
        value={props.value}
        onClick={props.action}
      >
        <div className="button__inner">
          {props.text}
        </div>
      </button>
    </div>
  );
}

export default Button;