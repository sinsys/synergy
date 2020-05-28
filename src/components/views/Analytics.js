// View Component - Analytics page
import React, { useContext } from 'react';

import { SynergyContext } from 'contexts/SynergyContext';
import EnhancedTable from 'components/visualization/EnhancedTable/EnhancedTable';

import './Views.scss';

const Analytics = () => {

  const { state, dispatch } = useContext(SynergyContext);

  return (
    <div className="AnalyticsView View">
      <h1>Analytics</h1>
      <p>To be filled...</p>
    </div>
  );
}

export default Analytics;