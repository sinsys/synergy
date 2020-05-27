// View Component - Analytics page
import React, { useContext } from 'react';

import { SynergyContext } from 'contexts/SynergyContext';

import './Views.scss';

const Members = () => {

  const { state, dispatch } = useContext(SynergyContext);

  return (
    <div className="MembersView View">
      <h1>Members</h1>
      <p>To be filled...</p>
    </div>
  );
}

export default Members;