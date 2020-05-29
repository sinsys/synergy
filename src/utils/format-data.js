const formatPlayerStats = (wars, members) => {
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
    // Add war statistic information
    curPlayer.wins = curPlayer.wins || 0;
    curPlayer.win_perc = Math.round((curPlayer.wins / curPlayer.number_of_battles) * 100 );
    curPlayer.missed_collections = (curPlayer.wars * 3) - curPlayer.collection_day_battles_played;
    curPlayer.missed_war_battles = curPlayer.number_of_battles - curPlayer.battles_played;
    curPlayer.legendary_perc = Math.round(curPlayer.legendary_perc * 100);
    curPlayer.gold_perc = Math.round(curPlayer.gold_perc * 100);

    // Handle NaN values
    curPlayer.win_perc = isNaN(curPlayer.win_perc)
      ? 0
      : curPlayer.win_perc;
    curPlayer.missed_collections = isNaN(curPlayer.missed_collections)
      ? 0
      : curPlayer.missed_collections;
    curPlayer.missed_war_battles = isNaN(curPlayer.missed_war_battles)
      ? 0
      : curPlayer.missed_war_battles;
    curPlayer.number_of_battles = curPlayer.number_of_battles || 0;

    return curPlayer;
  });
  return membersArr;
};

const formatClanStatus = (clanStatus) => {
  switch(clanStatus) {
    case "inviteOnly": return "Invite";
    case "closed": return "Closed";
    case "open": return "Open";
    default: return "Loading..."
  };
};

const calculateTheoreticalBest = (players) => {
  if (players.length > 0) {
    let totalTrophies = 0;
    let synergyMembers = 0;
    let sortedPlayers = players.sort((a,b) => b.best_trophies - a.best_trophies);
    sortedPlayers.forEach((player, i) => {
      if ( i < 50 && player.clan_tag === "809R8PG8") synergyMembers += 1;
      if ( i >= 0 && i < 10) totalTrophies += (player.best_trophies * 0.5);
      if ( i >= 10 && i < 20) totalTrophies += (player.best_trophies * 0.25);
      if ( i >= 20 && i < 30) totalTrophies += (player.best_trophies * 0.12);
      if ( i >= 30 && i < 40) totalTrophies += (player.best_trophies * 0.1);
      if ( i >= 40 && i < 50) totalTrophies += (player.best_trophies * 0.03);
    });
    return {
      players: sortedPlayers,
      totalTrophies: totalTrophies
    };
  }
};

const createBasicRows = (
  name, 
  clan_name, 
  role, tag, 
  trophies, 
  best_trophies, 
  war_day_wins, 
  gold_perc, 
  legendary_perc, 
  donations, 
  donations_received, 
  favorite_card
) => {
  return { 
    name, 
    clan_name, 
    role, 
    tag, 
    trophies, 
    best_trophies, 
    war_day_wins, 
    gold_perc, 
    legendary_perc, 
    donations, 
    donations_received, 
    favorite_card 
  };
};

module.exports = {
  formatPlayerStats,
  formatClanStatus,
  calculateTheoreticalBest,
  createBasicRows
};