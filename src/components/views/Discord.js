// View Component - Analytics page
import React, { useContext } from 'react';

import { SynergyContext } from 'contexts/SynergyContext';

import './Views.scss';

const Discord = () => {

  const { state, dispatch } = useContext(SynergyContext);

  return (
    <div className="DiscordView View">
      <h1>Discord</h1>
      <iframe title="Synergy Discord" src="https://discord.com/widget?id=438691071036358656&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
    </div>
  );
}

export default Discord;