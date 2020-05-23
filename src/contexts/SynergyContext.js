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
  raw: {
    cards: [],
    players: [],
    clans: [],
    wars: [],
    warPlayers: []
  },
  currentClan: {
    clan: {},
    players: [],
    wars: []
  }
};

const reducer = (state, action) => {
  let payload = action.payload;
  switch (action.type) {
    case 'setRawData':
      return {
        ...state,
        fetched: true,
        raw: {
          ...state.raw,
          ...payload
        }
      };
    case 'setClanData':
      return {
        ...state,
        currentClan: {
          clan: payload.clan,
          players: payload.players,
          wars: payload.wars.wars
        }
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