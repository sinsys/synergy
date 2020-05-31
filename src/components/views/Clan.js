import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SynergyContext } from 'contexts/SynergyContext';
import ClanBadge from 'components/badges/ClanBadge';
import EnhancedTable from 'components/visualization/EnhancedTable/EnhancedTable';
import { createColumns, createClanRows } from 'utils/table-utils';
import CircularProgress from '@material-ui/core/CircularProgress';
const Clan = (props) => {

  const { state } = useContext(SynergyContext);
  const { clan_tag } = useParams();

  const clan = state.clans.find(clan => clan.tag === clan_tag);
  const players = state.players.filter(player => player.clan_tag === clan_tag);
  let rows = [];
  let columns = [];
  if (players.length > 0) {
    rows = players.map(player => {
      // let favoriteCard = (
      //   <img 
      //     className="Table_img"
      //     src={state.cards.find(card => card.id === player.favorite_card).icon_url}
      //     alt={"Card Thumb"}
      //   />
      // );
      return createClanRows(
        player.name, 
        player.win_perc,
        player.war_streak,
        player.gold_perc,
        player.legendary_perc,
        player.role,
        player.missed_collections,
        player.missed_war_battles,
        player.war_day_wins,
        player.clan_cards_collected,
        player.cards_earned,
        player.donation_ratio,
        player.donations,
        player.donations_received,
        player.star_points
      );
    });
  
    columns = createColumns([
      'name',
      'win_perc',
      'war_streak',
      'gold_perc',
      'legendary_perc',
      'role',
      'missed_collections',
      'missed_war_battles',
      'war_day_wins',
      'clan_cards_collected',
      'cards_earned',
      'donation_ratio',
      'donations',
      'donations_received',
      'star_points'
    ]);
  };

  const renderClanPage = (clan) => {
    return (
      <React.Fragment>
        <ClanBadge clan={clan} />
        <EnhancedTable
          rows={rows} 
          columns={columns}
          rowsPerPage={50}
        />
      </React.Fragment>

    );
  };
  return (
    <div className="ClanView View">
      {typeof clan !== 'undefined' 
        ? renderClanPage(clan)
        : <div className="progress-bar__wrapper">
            <CircularProgress color="white"/>
          </div>
      }
    </div>
  );
}

export default Clan;