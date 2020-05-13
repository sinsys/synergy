import React, { useState, useEffect } from 'react';
import BaseTable, { Column, SortOrder } from 'react-base-table';
import 'react-base-table/styles.css'

import './App.css';

function App() {

  const defaultSort = { key: 'win_perc', order: SortOrder.DESC }
  // const [warData, setWarData] = useState([]);
  // const [warParticipantsData, setWarParticipantsData] = useState([]);
  // const [playerData, setPlayerData] = useState([]);
  const [combinedPlayerData, setCombinedPlayerData] = useState([]);
  const [sortOrder, setSortOrder] = useState(defaultSort);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/api/wars/8URQ0UR8`),
      fetch(`http://localhost:8000/api/players/clan/8URQ0UR8`)
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([wars, members]) => {
        // setWarData(wars.wars);
        // setWarParticipantsData(wars.players);
        // setPlayerData(members);
        let memberData = {};

        // Add basic member stats and keys to our current players data
        members.forEach(member => {
          memberData[member.tag] = member;
        });

        // Add war calculated statistics to our current player's data
        wars.players.forEach(entry => {
          if ( memberData.hasOwnProperty(entry.tag) ) {
            let member = memberData[entry.tag];
            if ( !member.hasOwnProperty('wars') ) {
              member.wars = 1;
              member.battles_played = entry.battles_played;
              member.cards_earned = entry.cards_earned;
              member.collection_day_battles_played = entry.collection_day_battles_played;
              member.number_of_battles = entry.number_of_battles;
              member.wins = entry.wins;
              member.war_id = [entry.war_id];
            } else {
              member.battles_played += entry.battles_played;
              member.cards_earned += entry.cards_earned;
              member.clan_tag = entry.clan_tag;
              member.collection_day_battles_played += entry.collection_day_battles_played;
              member.number_of_battles += entry.number_of_battles;
              member.wins += entry.wins;
              member.wars += 1;
              member.war_id.push(entry.war_id);
            }
          }
        });
        let membersArr = Object.keys(memberData).map(player => {
          let curPlayer = memberData[player];
          curPlayer.win_perc = curPlayer.wins / curPlayer.number_of_battles;
          curPlayer.missed_collections = (curPlayer.wars * 3) - curPlayer.collection_day_battles_played;
          curPlayer.missed_war_battles = curPlayer.number_of_battles - curPlayer.battles_played;
          return curPlayer;
        })
        setCombinedPlayerData(membersArr);
      })

    return (() => {});
  },[]);

  const onColumnSort = (sortBy) => {
    setSortOrder(sortBy);
    let sortedData = combinedPlayerData.sort((a, b) => {
      let sortKey = sortBy.key;
      let sortOrder = sortBy.order;
      if (sortOrder === "desc") {
        return a[sortKey] - b[sortKey];
      } else {
        return b[sortKey] - a[sortKey.key];
      };
    });
    setCombinedPlayerData(sortedData);
  };

  const renderTable = (data) => {
    if ( data.length > 0 ) {
      const columns = [
        "name",
        "win_perc",
        "number_of_battles",
        "wins",
        "legendary_perc",
        "gold_perc",
        "missed_collections",
        "missed_war_battles",
        "role",
        "tag"
      ];
      const tableData = data.map(player => {
        return ({
          ...player,
          legendary_perc: Math.round(player.legendary_perc * 100),
          gold_perc: Math.round(player.gold_perc * 100),
          win_perc: isNaN(player.win_perc)
            ? 0
            : Math.round(player.win_perc * 100),
          missed_collections: isNaN(player.missed_collections)
            ? 0
            : player.missed_collections,
          missed_war_battles: isNaN(player.missed_war_battles)
            ? 0
            : player.missed_war_battles,
          number_of_battles: player.number_of_battles || 0,
          wins: player.wins || 0
        });
      });
      tableData.sort((a, b) => b.win_perc - a.win_perc);

      let width = window.innerWidth;
      let height = window.innerHeight;
      return (
        <BaseTable
          fixed
          data={tableData}
          width={width}
          height={height}
          rowKey={"tag"}
          sortBy={sortOrder}
          onColumnSort={onColumnSort}
        >
          {columns.map(column => {
            return (
              <Column
                key={column}
                dataKey={column}
                title={column}
                width={150}
                sortable={true}
              />
            );
          })}
        </BaseTable>
      )
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }

  return (
    <div className="App">
      {renderTable(combinedPlayerData)}
    </div>
  );
}

export default App;

