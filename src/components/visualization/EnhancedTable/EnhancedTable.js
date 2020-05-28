
import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { SynergyContext } from 'contexts/SynergyContext';

const columns = [
  { id: 'name', label: 'Name'},
  { id: 'clan_name', label: 'Clan' },
  { id: 'role', label: 'Role' },
  { id: 'tag', label: 'Tag' },
  { id: 'trophies', label: 'Trophies' },
  { id: 'best_trophies', label: 'Personal Best' },
  { id: 'war_day_wins', label: 'War Day Wins' },
  { id: 'gold_perc', label: 'Lvl 11+ Cards' },
  { id: 'legendary_perc', label: 'Lvl 12+ Cards' },
  { id: 'donations', label: 'Donations' },
  { id: 'donations_received', label: 'Donations Received' },
  { id: 'favorite_card', label: 'Favorite Card'}
];

function createData(name, clan_name, role, tag, trophies, best_trophies, war_day_wins, gold_perc, legendary_perc, donations, donations_received, favorite_card) {
  return { name, clan_name, role, tag, trophies, best_trophies, war_day_wins, gold_perc, legendary_perc, donations, donations_received, favorite_card };
};

const useStyles = makeStyles({
  root: {
    width: '90%',
    color: '#000000'
  },
  container: {
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#DDD'
    }
  }
}))(TableRow);

export default function StickyHeadTable() {
    
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
    return createData(player.name, clanName, role, `#${player.tag}`, player.trophies, player.best_trophies, player.war_day_wins, goldPerc, legendaryPerc, player.donations, player.donations_received, favoriteCard);
  });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size={'small'}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.tag}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, rows.length]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}