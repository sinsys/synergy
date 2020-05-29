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
  players: []
};

const reducer = (state, action) => {
  let payload = action.payload;
  switch (action.type) {
    case 'setCards':
      return {
        ...state,
        cards: payload
      }
    case 'setClans':
      return {
        ...state,
        clans: payload
      };
    case 'setPlayers':
      return {
        ...state,
        players: payload
      }
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