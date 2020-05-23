import React, { useState } from 'react';

import trophy from '../../assets/images/trophy.png';
import trophyCw from '../../assets/images/trophy-cw.png';
import social from '../../assets/images/social.png';
import cards from '../../assets/images/cards.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import './ClanBadge.scss';
const ClanBadge = (props) => {

  const clan = props.clan;

  return (
    <div className="ClanBadge">
      <div className="clan__name">
        <h1>        
          <img
            className="clan__badge" 
            src={require(`../../assets/cr-assets/images/badges/${clan.badge_id}.png`)}
            alt="Clan Badge"
          />
          <span className="clan__name_text">
            {clan.name}
            <p className="clan__tag">
              #{clan.tag}
            </p>
          </span>
        </h1>
      </div>
      <div className="clan__trophies">
        <p className="clan__trophies-ladder">
          <img
            className="small_icon"
            src={trophy}
            alt="Clan Trophies"
          />
          {clan.clan_score}
        </p>
        <p className="clan__trophies-war">
          <img
            className="small_icon"
            src={trophyCw}
            alt="Clan War Trophies"
          />
          {clan.clan_war_trophies}
        </p>
      </div>
      <p className="clan__description">
        {clan.description}
      </p>
      <div className="clan__details">
        <div className="clan__members clan__icon">
          <img
            className="small_icon"
            src={social}
            alt="Members" />
          <p>{clan.members}/50</p>
        </div>
        <div className="clan__donations clan__icon">
          <img
            className="small_icon" 
            src={cards} 
            alt="Donations" 
          />
          <p>{clan.donations_per_week}</p>
        </div>
        <div className="clan__required_trophies clan__icon">
          <FontAwesomeIcon className="small_icon" icon={faTrophy} />
          <p>{typeof clan.required_trophies !== "undefined" ? clan.required_trophies : "...Loading"}</p>
        </div>
        <div className="clan__type clan__icon">
          <FontAwesomeIcon className="small_icon" icon={faUserPlus} />
          <p>
            {typeof clan.type !== "undefined" 
              ? clan.type === "inviteOnly"
                ? "Invite Only"
                : "Open"
              : "...Loading"
            }
          </p>
        </div>
        <div className="clan__location clan__icon">
          <FontAwesomeIcon className="small_icon" icon={faGlobeAmericas} />
          <p>{typeof clan.location !== "undefined" ? clan.location : "...Loading"}</p>
        </div>
      </div>

    </div>
  );
}

export default ClanBadge;