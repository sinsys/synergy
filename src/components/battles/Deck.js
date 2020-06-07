import React from 'react';
import Button from 'components/elements/Button';
import './Deck.scss';

const Deck = (props) => {
  const deckDetails = props.deck;
  let deckLink = `https://link.clashroyale.com/deck/en?deck=`;
  deckDetails.deck.forEach(card => {
    deckLink += `${card.id};`;
  });
  deckLink += `&war=1`;
  return (
    <div className="deck">
      <p>Player: {deckDetails.name}</p>
      <p>{deckDetails.won
        ? "Won"
        : "Lost"
      }</p>
      <p>Crowns: {deckDetails.crowns}</p>
      <p>Opponent Crowns: {deckDetails.opponent_crowns}</p>
      <p>Total HP Remaining: {deckDetails.king_tower_hit_points + deckDetails.princess_tower_hit_points_1 + deckDetails.princess_tower_hit_points_2}</p>
      <div className="deck_images">
        {deckDetails.deck.map(card => {
          return (
            <img src={card.icon_url} alt={card.name + " card"} key={`${card.id}-${deckDetails.id}`}/>
          );
        })}
      </div>
      <Button text="Copy War Deck" link={deckLink} />
    </div>
  );
};

export default Deck;