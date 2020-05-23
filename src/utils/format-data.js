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

module.exports = {
  formatPlayerStats
};