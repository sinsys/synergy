import React, { useContext } from 'react';
import { SynergyContext } from 'contexts/SynergyContext';

const Table = () => {

  const { state } = useContext(SynergyContext);

  return (
    <div className="Table">
      Table
    </div>
  );
}

export default Table;

