import React from 'react';
import Button from 'components/elements/Button';

import './WarState.scss';

const WarState = (props) => {

  return (
    <div className="WarState">
      <h2>War State:</h2>
      <p>{props.active.toString()}</p>
      <Button text="View Decks" />
    </div>
  );
}

export default WarState;

WarState.defaultProps = {
  active: true
};