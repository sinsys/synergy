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

const makeWarDate = (dateStr) => {
	let stripDate = dateStr.split('_')[0];
  let year = stripDate.slice(0,4);
  let month = stripDate.slice(4,6);
  let day = stripDate.slice(6,8);
  let hour = stripDate.slice(9,11);
  let min = stripDate.slice(11,13);
  let ss = stripDate.slice(13,15);
  let sss = stripDate.slice(16,19);
	let convertedDateStr = `${year}-${month}-${day}T${hour}:${min}:${ss}.${sss}Z`;
	return new Date(convertedDateStr);
}

const formatPlayerStats = (warPlayers, players, clans, cards) => {
  let playerData = {};
  
  players.forEach(player => {
    player.wars = 0;
    player.battles_played = 0;
    player.cards_earned = 0;
    player.collection_day_battles_played = 0;
    player.number_of_battles = 0;
    player.wins = 0;
    player.war_id = [];
    player.missed_collections = 0;
    player.missed_war_battles = 0;
    player.win_perc = 0;
    player.war_streak = 0;
    player.clan_name = "";
    player.favorite_card_img_url = ""
    playerData[player.tag] = player;
  });

  let sortedWarPlayers = warPlayers.sort((a,b) => makeWarDate(a.war_id) - makeWarDate(b.war_id));

  sortedWarPlayers.map(warEntry => {
    if ( playerData.hasOwnProperty(warEntry.tag) ) {
      let cur = playerData[warEntry.tag];
      cur.battles_played += warEntry.battles_played;
      cur.cards_earned += warEntry.cards_earned;
      cur.collection_day_battles_played += warEntry.collection_day_battles_played;
      cur.war_id.push(warEntry.war_id);
      cur.number_of_battles += warEntry.number_of_battles;
      cur.wins += warEntry.wins;
      cur.wars += 1;
      // Check players war streak
      if (warEntry.wins > 0) {
        if (cur.war_streak >= 0) {
          cur.war_streak += warEntry.wins;
        } else {
          cur.war_streak = warEntry.wins;
        }
      } else {
        if (cur.war_streak >= 0) {
          cur.war_streak = -Math.abs(warEntry.battles_played - warEntry.wins);
        } else {
          cur.war_streak -= (warEntry.battles_played - warEntry.wins)
        }
      }
    }
  });

  let playersArr = Object.keys(playerData).map(key => {
    let cur = playerData[key];
    if ( cur.donations_received === 0 ) {
      cur.donation_ratio = '1:0'
    } else if ( cur.donations === 0 ) {
      cur.donation_ratio = '0:1'
    } else {
      cur.donation_ratio = (cur.donations / cur.donations_received).toFixed(2);
    }
    cur.win_perc = parseFloat(((cur.wins / cur.battles_played) * 100).toFixed(1)) || 0;
    cur.missed_collections = (cur.wars * 3) - cur.collection_day_battles_played;
    cur.missed_war_battles = cur.number_of_battles - cur.battles_played;
    cur.clan_name = clans.find(clan => clan.id === cur.clan_tag).name;
    cur.role = cur.role.charAt(0).toUpperCase() + cur.role.slice(1);
    cur.gold_perc = parseFloat((cur.gold_perc * 100).toFixed(1));
    cur.legendary_perc = parseFloat((cur.legendary_perc * 100).toFixed(1));
    cur.favorite_card_img_url = cards.find(card => card.id === cur.favorite_card).icon_url;
    return cur;
  });
  return playersArr;
};

const convertCardsToObj = (cards) => {
  let cardObj = {};
  cards.forEach(card => {
    cardObj[card.id] = card;
  });
  return cardObj;
};

module.exports = {
  formatPlayerStats,
  formatClanStatus,
  calculateTheoreticalBest,
  makeWarDate,
  convertCardsToObj
};