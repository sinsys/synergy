// View Component - Analytics page
import React, { useContext } from 'react';
import EnhancedTable from 'components/visualization/EnhancedTable/EnhancedTable';
import { SynergyContext } from 'contexts/SynergyContext';

import './Views.scss';

const Members = () => {

  const { state, dispatch } = useContext(SynergyContext);

  return (
    <div className="MembersView View">
      <h1>All Synergy Members</h1>
      <EnhancedTable />
    </div>
  );
}

export default Members;