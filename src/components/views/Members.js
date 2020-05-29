// View Component - Analytics page
import React, { useContext } from 'react';
import EnhancedTable from 'components/visualization/EnhancedTable/EnhancedTable';
import { SynergyContext } from 'contexts/SynergyContext';
import { createBasicRows, createColumns } from 'utils/table-utils';

import './Views.scss';

const Members = () => {

  const { state, dispatch } = useContext(SynergyContext);

  const rows = state.players.map(player => {
    let clanName = state.clans.find(clan => clan.id === player.clan_tag).name;
    let role = player.role.charAt(0).toUpperCase() + player.role.slice(1);
    let goldPerc = (player.gold_perc * 100).toFixed(1) + '%';
    let legendaryPerc = (player.legendary_perc * 100).toFixed(1) + '%';
    let favoriteCard = (
      <img 
        className="Table_img"
        src={state.cards.find(card => card.id === player.favorite_card).icon_url}
        alt={"Card Thumb"}
      />
    );
    return createBasicRows(
      player.name, 
      clanName, 
      role, 
      `#${player.tag}`, 
      player.trophies, 
      player.best_trophies, 
      player.war_day_wins, 
      goldPerc, 
      legendaryPerc, 
      player.donations, 
      player.donations_received, 
      favoriteCard
    );
  });

  let columns = createColumns([
    'name',
    'clan_name',
    'role',
    'tag',
    'trophies',
    'best_trophies',
    'war_day_wins',
    'gold_perc',
    'legendary_perc',
    'donations',
    'donations_received',
    'favorite_card'
  ]);
  
  return (
    <div className="MembersView View">
      <h1 className="small">Synergy Members</h1>
      <EnhancedTable 
        rows={rows} 
        columns={columns}
        rowsPerPage={20}
      />
    </div>
  );
}

export default Members;