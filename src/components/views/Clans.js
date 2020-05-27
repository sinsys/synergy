// Clans.js - View component for all clans
import React, { useContext } from 'react';

// Data / Contexts
import { SynergyContext } from 'contexts/SynergyContext';

// Element Components
import ClanBadge from 'components/badges/ClanBadge';

// Files / Styles
import './Views.scss';

const Clans = () => {

  const { state } = useContext(SynergyContext);

  return (
    <div className="HomeView View">
      { state.clans.map(clan => {
        return (
          <ClanBadge key={clan.tag} clan={clan} />
        );
      })}
    </div>
  );
}

export default Clans;