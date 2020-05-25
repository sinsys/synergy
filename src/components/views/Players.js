import React, { useContext } from 'react';
import { SynergyContext } from 'contexts/SynergyContext';
import ClanBadge from 'components/badges/ClanBadge';

const Players = (props) => {

  const { state } = useContext(SynergyContext);
  const clan = state.clans.find(clan => clan.tag === props.clan.clan_tag) || {};

  return (
    <div className="ClanView">
      <ClanBadge clan={clan} />
    </div>
  );
}

export default Players;