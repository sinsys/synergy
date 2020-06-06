import React, { useContext } from 'react';
import Deck from 'components/battles/Deck';

import { SynergyContext } from 'contexts/SynergyContext';

const War = () => {
  const { state, dispatch } = useContext(SynergyContext);

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
      {getDeckDetails(state.warDecks).map(deck => {
        return (
          <Deck deck={deck} key={deck.id} />
        );
      })}
    </div>
  )
};

export default War;