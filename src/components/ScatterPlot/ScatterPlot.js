import React, { useContext } from 'react';
import { SynergyContext } from 'contexts/SynergyContext';

const ScatterPlot = () => {

  const { state } = useContext(SynergyContext);

  return (
    <div className="ScatterPlot">
      ScatterPlot
    </div>
  );
};

export default ScatterPlot;