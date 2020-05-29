
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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { SynergyContext } from 'contexts/SynergyContext';
import { 
  descendingComparator, 
  getComparator,
  stableSort,
  createBasicColumns,
  createBasicRows 
} from 'utils/table-utils';

const columns = createBasicColumns([
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
    color: '#CCC'
  }
});

const StickyHeadTable = (props) => {
    
  const { state, dispatch } = useContext(SynergyContext);
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('trophies');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    return createBasicRows(player.name, clanName, role, `#${player.tag}`, player.trophies, player.best_trophies, player.war_day_wins, goldPerc, legendaryPerc, player.donations, player.donations_received, favoriteCard);
  });


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EnhancedTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {columns.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                classes={{root: classes.sortLabel, active: classes.sortLabel}}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                IconComponent={ArrowDropDownIcon}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size={'small'}>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow tabIndex={-1} key={row.tag}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ display: "flex", justifyContent: "center" }}
        rowsPerPageOptions={[10, 50, rows.length]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={"Rows/Page"}
      />
    </Paper>
  );
};

export default StickyHeadTable;