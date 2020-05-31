import React, { useEffect, useContext } from 'react';
import PublicRouter from 'routers/PublicRouter';
import config from './config';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SynergyContext } from 'contexts/SynergyContext';
import MenuBar from 'components/widgets/MenuBar';
import MenuDrawer from 'components/widgets/MenuDrawer';
import supercell from 'themes/supercell';
import { formatPlayerStats } from 'utils/format-data';

// App Styles
import './App.scss';

const App = () => {
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
  const { dispatch } = useContext(SynergyContext);
  
  useEffect(() => {
    Promise.all([
      fetch(`${config.REACT_APP_API_ENDPOINT}/cards`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/clans`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/players/all`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/wars/all`)
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([cards, clans, players, wars]) => {

        let enhancedPlayers = formatPlayerStats(wars.warPlayers, players, clans, cards);

        dispatch({
          type: 'setAll',
          payload: {
            cards: cards,
            clans: clans,
            players: enhancedPlayers,
            wars: wars.wars,
            warPlayers: wars.warPlayers
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