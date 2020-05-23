import React, { useEffect, useContext } from 'react';
import PublicRouter from 'routers/PublicRouter';
import config from './config';
import { SynergyContext } from 'contexts/SynergyContext';
import { formatPlayerStats } from 'utils/format-data';

import './App.scss';

const App = () => {

  const { dispatch } = useContext(SynergyContext);
  
  useEffect(() => {
    Promise.all([
      fetch(`${config.REACT_APP_API_ENDPOINT}/cards`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/clans`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/wars/8URQ0UR8`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/players/clan/8URQ0UR8`),
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([cards, clans, wars, clanPlayers]) => {
        let contextData = {
          cards: cards,
          players: clanPlayers,
          clans: clans,
          wars: wars,
          warPlayers: clanPlayers
        };
        
        dispatch({
          type: 'setRawData',
          payload: contextData
        });

        dispatch({
          type: 'setClanData',
          payload: {
            clan: clans.find(clan => clan.tag === '8URQ0UR8'),
            wars: wars,
            players: formatPlayerStats(wars, clanPlayers)
          }
        });

      });

  },[dispatch]);

  return (
    <div className="App">
      <PublicRouter />
    </div>
  );
}

export default App;