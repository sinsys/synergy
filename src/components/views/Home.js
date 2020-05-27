import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { SynergyContext } from 'contexts/SynergyContext';
import './Home.scss';
// import Button from 'components/elements/Button';

const Home = () => {

  const { state } = useContext(SynergyContext);
  // const history = useHistory();

  return (
    <div className="HomeView View">
      <h1>Welcome to Synergy Gaming</h1>
      <h2>Learn Together. Laugh Together. Compete Together.</h2>
    </div>
  );
}

export default Home;