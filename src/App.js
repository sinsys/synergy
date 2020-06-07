import React, { useEffect, useContext } from 'react';
import PublicRouter from 'routers/PublicRouter';
import config from './config';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SynergyContext } from 'contexts/SynergyContext';
import MenuBar from 'components/widgets/MenuBar';
import MenuDrawer from 'components/widgets/MenuDrawer';
import supercell from 'themes/supercell';
import { formatPlayerStats, convertCardsToObj } from 'utils/format-data';

// App Styles
import './App.scss';

const App = () => {

  const { dispatch } = useContext(SynergyContext);
  
  useEffect(() => {
    Promise.all([
      fetch(`${config.REACT_APP_API_ENDPOINT}/cards`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/clans`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/players/all`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/wars/all`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/wardecks/809R8PG8`)
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([cards, clans, players, wars, warDecks]) => {

        let enhancedPlayers = formatPlayerStats(wars.warPlayers, players, clans, cards);

        dispatch({
          type: 'setAll',
          payload: {
            cards: convertCardsToObj(cards),
            clans: clans,
            players: enhancedPlayers,
            wars: wars.wars,
            warPlayers: wars.warPlayers,
            warDecks: warDecks
          }
        });
        
      });

  },[dispatch]);

  return (
    <MuiThemeProvider theme={supercell}>
      <div className="App">
        <MenuBar />
        <MenuDrawer />
        <p style={{"padding": "1rem"}}>We are currently under construction.</p>
        <PublicRouter />
      </div>
    </MuiThemeProvider>

  );
}

export default App;