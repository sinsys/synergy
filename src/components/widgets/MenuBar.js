import React, { useContext } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { MenuContext } from 'contexts/MenuContext';

const MenuBar = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: '#131313',
      marginBottom: '1rem'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontFamily: 'sctitle',
      fontSize: '1rem',
      textAlign: 'center'
    },
  }));

  const { dispatch } = useContext(MenuContext);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch({ type: 'toggleDrawer', payload: open });
  };

  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"  onClick={toggleDrawer(true)} >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Synergy Gaming
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
