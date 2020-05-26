// Clans.js - View component for all clans
import React, { useContext } from 'react';

// Data / Contexts
import { SynergyContext } from 'contexts/SynergyContext';

// Element Components
import ClanBadge from 'components/badges/ClanBadge';

// Files / Styles
import './Home.scss';

const Clans = () => {

  const { state } = useContext(SynergyContext);

  return (
    <div className="HomeView">
      { state.clans.map(clan => {
        return (
          <ClanBadge key={clan.tag} clan={clan} />
        );
      })}
    </div>
  );
}

export default Clans;