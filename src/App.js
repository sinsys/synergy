import React, { useEffect, useContext } from 'react';
import PublicRouter from 'routers/PublicRouter';
import config from './config';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SynergyContext } from 'contexts/SynergyContext';
import MenuBar from 'components/widgets/MenuBar';
import MenuDrawer from 'components/widgets/MenuDrawer';
import supercell from 'themes/supercell';

// App Styles
import './App.scss';

const App = () => {

  const { dispatch } = useContext(SynergyContext);
  
  useEffect(() => {
    Promise.all([
      fetch(`${config.REACT_APP_API_ENDPOINT}/cards`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/clans`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/players/all`)
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([cards, clans, players]) => {
  
        dispatch({
          type: 'setCards',
          payload: cards
        });

        dispatch({
          type: 'setClans',
          payload: clans
        });

        dispatch({
          type: 'setPlayers',
          payload: players
        });
      });

  },[dispatch]);

  return (
    <MuiThemeProvider theme={supercell}>
      <div className="App">
        <MenuBar />
        <MenuDrawer />
        <p style={{"padding": "1rem"}}>We are currently under construction. Please be patient while we develop more features.</p>
        <PublicRouter />
      </div>
    </MuiThemeProvider>

  );
}

export default App;