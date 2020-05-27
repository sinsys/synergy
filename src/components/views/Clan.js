import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SynergyContext } from 'contexts/SynergyContext';

import ClanBadge from 'components/badges/ClanBadge';

const Clan = (props) => {


  const { state } = useContext(SynergyContext);
  const { clan_tag } = useParams();
  const clan = state.clans.find(clan => clan.tag === clan_tag);
  
  return (
    <div className="ClanView View">
      {typeof clan !== 'undefined' 
        ? <ClanBadge clan={clan} />
        : "Loading Data..."
      }
    </div>
  );
}

export default Clan;