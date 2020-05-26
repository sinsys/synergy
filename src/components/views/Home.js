import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { SynergyContext } from 'contexts/SynergyContext';
import ClanBadge from 'components/badges/ClanBadge';
import './Home.scss';
// import Button from 'components/elements/Button';

const Home = () => {

  const { state } = useContext(SynergyContext);
  // const history = useHistory();

  return (
    <div className="HomeView">
      {/* <Button
        text="Test"
      /> */}
      { state.clans.map(clan => {
        return (
          <ClanBadge key={clan.tag} clan={clan} />
        );
      })}
    </div>
  );
}

export default Home;