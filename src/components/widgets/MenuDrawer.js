import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
import { 
  faHome,
  faShieldAlt,
  faUsers,
  faChartLine,
  faSitemap,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

import './MenuDrawer.scss';

const useStyles = makeStyles({
  list: {
    width: 250,
    color: '#FEFEFE'
  },
  fullList: {
    width: 'auto'
  },
  paper: {
    background: '#333'
  }
});

export default function MenuDrawer() {

  // Classes for the Drawer Mui Component
  const classes = useStyles();
  
  // Used for accessing location
  const history = useHistory();

  // Set main context as our MenuContext
  const { state, dispatch } = useContext(MenuContext);

  // Import clan/player data
  const synergyContext = useContext(SynergyContext);

  // Set clan badges after fetch
  const clans = synergyContext.state.clans.length > 0
    ? synergyContext.state.clans
    : [];

  // Open / Close drawer function
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch({ type: 'toggleDrawer', payload: open });
  };

  // Main menu links obj
  const menuLinks = [
    {
      key: 'overview',
      icon: faHome,
      text: 'Overview',
      path: '/'
    },
    {
      key: 'clans',
      icon: faShieldAlt,
      text: 'Clans',
      path: '/clans'
    },
    {
      key: 'members',
      icon: faUsers,
      text: 'Members',
      path: '/members'
    },
    {
      key: 'analytics',
      icon: faChartLine,
      text: 'Analytics',
      path: '/analytics'
    },
    {
      key: 'tournaments',
      icon: faSitemap,
      text: 'Tournaments',
      path: '/tournaments'
    },
    {
      key: 'giveaways',
      icon: faHandHoldingUsd,
      text: 'Give-Aways',
      path: '/giveaways'
    },
    {
      key: 'discord',
      icon: faDiscord,
      text: 'Discord',
      path: '/discord'
    }
  ];

  // Render function for the entire link list
  const renderNavLinks = (links, clans) => {

    // Base links
    let $links = links.map(link => {
      return (
        <Link to={link.path}>
        <ListItem selected={history.location.pathname === link.path} button key={`${link.key}`}>
          <ListItemIcon><FontAwesomeIcon className="small_icon" icon={link.icon} /></ListItemIcon>
          <ListItemText primary={`${link.text}`} />
        </ListItem>
        </Link>
      );
    });

    // Specific clan links
    let $clans = clans.map(clan => {
      const badge = clan.badge_id
        ? require(`../../assets/cr-assets/images/badges/${clan.badge_id}.png`)
        : require(`../../assets/cr-assets/images/badges/0.png`);

      return (
        <Link to={`/clans/${clan.tag}`}>
          <ListItem selected={history.location.pathname === `/clans/${clan.tag}`} button key={clan.name}>
            <ListItemIcon>
              <img
                className="small_icon" 
                src={badge}
                alt="Clan Badge"
              />
            </ListItemIcon>
            <ListItemText primary={clan.name} />
          </ListItem>
        </Link>
      );
    });

    // Return all links in JSX
    return (
      <React.Fragment>
        <List className="menu-list">
          {$links}
        </List>
        <Divider />
        <List className="menu-list">
          {$clans}
        </List>
      </React.Fragment>

    );
  };

  // Needed for Material UI Drawer
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {renderNavLinks(menuLinks, clans)}
    </div>
  );

  return (
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
  );
}


