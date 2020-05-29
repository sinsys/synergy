const descendingComparator = (a, b, orderBy) => {
  if (orderBy === 'gold_perc' || orderBy === 'legendary_perc') {
    let numericA = parseFloat(a[orderBy].split('%')[0]);
    let numericB = parseFloat(b[orderBy].split('%')[0]);
    if (numericA < numericB) {
      return -1;
    }
    if (numericA > numericB) {
      return 1;
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const createColumns = (cols) => {
  return cols.map(col => {
    switch(col) {
      case 'name': return {id: col, label: 'Name'};
      case 'clan_name': return {id: col, label: 'Clan'};
      case 'role': return {id: col, label: 'Role'};
      case 'tag': return {id: col, label: 'Tag'};
      case 'trophies': return {id: col, label: 'Trophies'};
      case 'best_trophies': return {id: col, label: 'Personal Best'};
      case 'war_day_wins': return {id: col, label: 'War Wins'};
      case 'gold_perc': return {id: col, label: 'Cards 11+'};
      case 'legendary_perc': return {id: col, label: 'Cards 12+'};
      case 'donations': return {id: col, label: 'Donations'};
      case 'donations_received': return {id: col, label: 'Donations Received'};
      case 'favorite_card': return {id: col, label: 'Favorite Card'};
      case 'cards_earned': return {id: col, label: 'Cards Earned'};
      case 'clan_cards_collected': return {id: col, label: 'Collection Cards'};
      case 'missed_collections': return {id: col, label: 'Missed Collections'};
      case 'missed_war_battles': return {id: col, label: 'Missed War Battles'};
      case 'star_points': return {id: col, label: 'Star Points'};
      case 'number_of_battles': return {id: col, label: 'War Battles'};
      case 'win_perc': return {id: col, label: 'War Win %'};
      case 'wars': return {id: col, label: 'Wars'};
      case 'wins': return {id: col, label: 'War Wins'};
      default: return null;
    };
  });
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

const createAdvancedRows = (
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
  descendingComparator,
  getComparator,
  stableSort,
  createColumns,
  createBasicRows,
  createAdvancedRows
};