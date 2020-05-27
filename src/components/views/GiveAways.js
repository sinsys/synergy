// View Component - Analytics page
import React, { useContext } from 'react';

import { SynergyContext } from 'contexts/SynergyContext';

import './Views.scss';

const GiveAways = () => {

  const { state, dispatch } = useContext(SynergyContext);

  return (
    <div className="GiveAwaysView View">
      <h1>Give Aways</h1>
      <p>To be filled...</p>
    </div>
  );
}

export default GiveAways;