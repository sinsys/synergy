// View Component - Analytics page
import React, { useContext } from 'react';
import EnhancedTable from 'components/visualization/EnhancedTable/EnhancedTable';
import { SynergyContext } from 'contexts/SynergyContext';
import { createBasicRows, createColumns } from 'utils/table-utils';

import './Views.scss';

const Members = () => {

  const { state, dispatch } = useContext(SynergyContext);

  const rows = state.players.map(player => {
    let favoriteCard = (
      <img 
        className="Table_img"
        src={player.favorite_card_img_url}
        alt={"Card Thumb"}
      />
    );
    
    return createBasicRows(
      player.name, 
      player.clan_name, 
      player.role, 
      `#${player.tag}`, 
      player.trophies, 
      player.best_trophies, 
      player.war_day_wins, 
      player.gold_perc + '%', 
      player.legendary_perc + '%', 
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
        rowsPerPage={50}
      />
    </div>
  );
}

export default Members;