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
      fetch(`${config.REACT_APP_API_ENDPOINT}/clans`)
      // fetch(`${config.REACT_APP_API_ENDPOINT}/wars/8URQ0UR8`),
      // fetch(`${config.REACT_APP_API_ENDPOINT}/players/clan/8URQ0UR8`),
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([cards, clans]) => {
  
        dispatch({
          type: 'setCards',
          payload: cards
        });

        dispatch({
          type: 'setClans',
          payload: clans
        });

      });

  },[dispatch]);

  return (
    <MuiThemeProvider theme={supercell}>
      <div className="App">
        <MenuBar />|
        <MenuDrawer />
        <h1 style={{"padding": "1rem"}}>We are currently under construction. Please be patient while we develop more features.</h1>
        <PublicRouter />
      </div>
    </MuiThemeProvider>

  );
}

export default App;