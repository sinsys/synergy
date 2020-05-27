// View Component - Home page aka Overview
import React, { useContext } from 'react';

import { SynergyContext } from 'contexts/SynergyContext';

import './Views.scss';

const Home = () => {

  const { state, dispatch } = useContext(SynergyContext);

  return (
    <div className="HomeView View">
      <h1>Welcome to Synergy Gaming</h1>
      <h2>Learn Together. Laugh Together. Compete Together.</h2>
    </div>
  );
}

export default Home;