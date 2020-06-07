import React, { useContext } from 'react';
import Deck from 'components/battles/Deck';

import { SynergyContext } from 'contexts/SynergyContext';

const War = (props) => {
  const { state, dispatch } = useContext(SynergyContext);
  const clanTag = props.match.params.clan_tag;
  const decks = state.warDecks.filter(deck => deck.clan_tag === clanTag);

  const getDeckDetails = (decks) => {
    if ( decks.length > 0 ) {
      const deckDetails = decks.map(deck => {
        return {
          ...deck,
          deck: deck.deck.map(cardId => {
            return state.cards[cardId]
          }),
          opponent_deck: deck.deck.map(cardId => {
            return state.cards[cardId]
          })
        };
      });
      return deckDetails;
    } else {
      return [];
    };
  };
  
  return (
    <div className="War">
      {getDeckDetails(decks).map(deck => {
        return deck.won
          ? <Deck deck={deck} key={deck.id} />
          : <div key={deck.id} />
      })}
    </div>
  )
};

export default War;