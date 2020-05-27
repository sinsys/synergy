// View Component - Analytics page
import React, { useContext } from 'react';

import { SynergyContext } from 'contexts/SynergyContext';

import './Views.scss';

const Tournaments = () => {

  const { state, dispatch } = useContext(SynergyContext);

  return (
    <div className="TournamentsView View">
      <h1>Tournaments</h1>
      <p>To be filled...</p>
    </div>
  );
}

export default Tournaments;