
import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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
    width: '100%'
  },
  container: {
    maxHeight: window.innerHeight - 250
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#131313',
    color: '#FFFFFF',
  },
  root: {
    '&.MuiTableSortLabel-active': {
      color: 'white'
    }
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#DDD'
    }
  }
}))(TableRow);

function descendingComparator(a, b, orderBy) {
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
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {columns.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size={'small'}>
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
        labelRowsPerPage={"Players Per Page"}
      />
    </Paper>
  );
}