import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SynergyContext } from 'contexts/SynergyContext';
import ClanBadge from 'components/badges/ClanBadge';
import { createColumns, createBasicRows } from 'utils/table-utils';
import { formatPlayerStats } from 'utils/format-data';
const Clan = (props) => {


  const { state } = useContext(SynergyContext);
  const { clan_tag } = useParams();
  const clan = state.clans.find(clan => clan.tag === clan_tag);
  const players = state.players.filter(player => player.clan_tag === clan_tag);
  const wars = state.wars.filter(war => war.clan_tag === clan_tag);
  const warPlayers = state.warPlayers.filter(player => player.clan_tag === clan_tag);
  
  const playerData = formatPlayerStats({wars: wars, players: warPlayers}, players);

  const rows = players.map(player => {
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


  const renderClanPage = (clan) => {
    return (
      <React.Fragment>
        <ClanBadge clan={clan} />
        
      </React.Fragment>

    );
  };
  return (
    <div className="ClanView View">
      {typeof clan !== 'undefined' 
        ? renderClanPage(clan)
        : "Loading Data..."
      }
    </div>
  );
}

export default Clan;