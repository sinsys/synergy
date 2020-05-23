import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SynergyContext } from 'contexts/SynergyContext';
import Button from 'components/elements/Button';
import ClanBadge from 'components/badges/ClanBadge';
import './Home.scss';

const Home = () => {

  const { state } = useContext(SynergyContext);
  const history = useHistory();
  
  return (
    <div className="HomeView">
      <h1 style={{"padding": "1rem"}}>We are currently under construction. Please be patient while we develop more features.</h1>
      { state.raw.clans.map(clan => {
        return (
          <ClanBadge clan={clan} />
        );
      })}
      {/* { state.raw.clans.map(clan => {
        return (
          <Button
            key={`clan-${clan.tag}`}
            classes="green"
            name={clan.tag}
            type="button"
            action={(e) => history.push(`/clan/${clan.tag}`)}
            value={clan.name}
            text={clan.name}
          />
        );
      })} */}
    </div>
  );
}

export default Home;