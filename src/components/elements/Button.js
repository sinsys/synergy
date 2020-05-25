import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <div className="Button">
      <a 
        className={`button ${props.classes}`} 
        target="_blank"
        href="/"
      >
        <span>{props.text}</span>
      </a>
    </div>
  );
}

export default Button;