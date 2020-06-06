import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <div className="Button">
      <a
        className={`button ${props.classes}`} 
        target={props.target}
        href={props.link}
      >
        <span>{props.text}</span>
      </a>
    </div>
  );
}

export default Button;