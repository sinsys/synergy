import React from 'react';
import Button from 'components/elements/Button';

import './WarState.scss';

const WarState = (props) => {

  return (
    <div className="WarState">
      <h2>War State:</h2>
      <p>{props.active}</p>
      {props.active === 'warDay'
        ? <Button text="View Decks" link={`/war/${props.tag}`}/>
        : ""
      }
    </div>
  );
}

export default WarState;

WarState.defaultProps = {
  active: true
};