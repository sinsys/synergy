import React, { useContext, useEffect, useState } from 'react';
import { SynergyContext } from 'contexts/SynergyContext';
import ClanBadge from 'components/badges/ClanBadge';
import config from 'config';

const Clan = (props) => {

  const { state } = useContext(SynergyContext);
  const clan = state.raw.clans.find(clan => clan.tag === props.clanTag) || {};
  const [remoteData, setRemoteData] = useState({});
  const [badge, setBadge] = useState(require('../../assets/cr-assets/images/badges/0.png'));

  useEffect(() => {
    if (state.fetched) {
      fetch(`${config.REACT_APP_API_ENDPOINT}/remote/clan/${clan.tag}`)
        .then(response => response.json())
        .then(clanData => {
          setRemoteData(clanData);
          setBadge(require(`../../assets/cr-assets/images/badges/${clanData.badgeId}.png`));
        });
    }
  // eslint-disable-next-line
  },[state.fetched, badge]);

  return (
    <div className="ClanView">
      <ClanBadge clan={clan} badge={badge} remote={remoteData} />
    </div>
  );
}

export default Clan;