import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SynergyContext } from 'contexts/SynergyContext';
import { MenuContext } from 'contexts/MenuContext';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  list: {
    width: 250,
    color: '#FEFEFE'
  },
  fullList: {
    width: 'auto',
    fontFamily: 'scmagic'
  },
  paper: {
    background: '#333'
  }
});

export default function MenuDrawer() {
  
  const classes = useStyles();
  const { state, dispatch } = useContext(MenuContext);
  const synergyContext = useContext(SynergyContext);
  
  const clans = synergyContext.state.clans.length > 0
    ? synergyContext.state.clans
    : [];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch({ type: 'toggleDrawer', payload: open });
  };

  const renderClanList = (clans) => {
    let $clans = clans.map(clan => {
      const badge = clan.badge_id
        ? require(`../../assets/cr-assets/images/badges/${clan.badge_id}.png`)
        : require(`../../assets/cr-assets/images/badges/0.png`);

      return (
        <ListItem button key={clan.name}>
          <ListItemIcon>
            <img
              className="small_icon" 
              src={badge}
              alt="Clan Badge"
            />
          </ListItemIcon>
          <ListItemText primary={clan.name} />
        </ListItem>
      );
    });
    return $clans;
  }
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className="menu-list">
        <ListItem button key={"overview"}>
          <ListItemIcon><FontAwesomeIcon className="small_icon" icon={faHome} /></ListItemIcon>
          <ListItemText primary={"Overview"} className="font-override scmagic" />
        </ListItem>
        <ListItem button key={"clans"}>
          <ListItemIcon><FontAwesomeIcon className="small_icon" icon={faShieldAlt} /></ListItemIcon>
          <ListItemText primary={"Clans"} />
        </ListItem>
        <ListItem button key={"members"}>
          <ListItemIcon><FontAwesomeIcon className="small_icon" icon={faUsers} /></ListItemIcon>
          <ListItemText primary={"Members"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {renderClanList(clans)}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Drawer 
          anchor={"left"} 
          open={state["isOpen"]} 
          onClose={toggleDrawer(false)} 
          classes={{paper: classes.paper}}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}