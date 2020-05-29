// Context for data
import React, {
  createContext,
  useReducer
} from 'react';

// Utilities, helpers
// const { formatPlayerStats } = require('../utils/format-data');

// Initialize Context
const SynergyContext = createContext();

// Set default context
const initialState = {
  fetched: false,
  cards: [],
  clans: [],
  players: [],
  wars: [],
  warPlayers: []
};

const reducer = (state, action) => {
  let payload = action.payload;
  switch (action.type) {
    case 'setAll': 
      return {
        ...state,
        cards: payload.cards,
        clans: payload.clans,
        players: payload.players,
        wars: payload.wars,
        warPlayers: payload.warPlayers
      };
    case 'setCards':
      return {
        ...state,
        cards: payload
      };
    case 'setClans':
      return {
        ...state,
        clans: payload
      };
    case 'setPlayers':
      return {
        ...state,
        players: payload
      };
    case 'setWars':
      return {
        ...state,
        wars: payload
      };
    case 'setWarPlayers':
      return {
        ...state,
        warPlayers: payload
      };
    default: return initialState;
  };
};

const SynergyContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <SynergyContext.Provider value={value}>
      {props.children}
    </SynergyContext.Provider>
  );
};

const SynergyContextConsumer = SynergyContext.Consumer;

export { SynergyContext, SynergyContextProvider, SynergyContextConsumer };