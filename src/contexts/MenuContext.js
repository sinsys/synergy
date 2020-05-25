// Context for data
import React, {
  createContext,
  useReducer
} from 'react';

// Initialize Context
const MenuContext = createContext();

// Set default context
const initialState = {
  isOpen: false
};

const reducer = (state, action) => {
  let payload = action.payload;
  switch (action.type) {
    case 'toggleDrawer':
      return {
        ...state,
        isOpen: payload
      }
    default: return initialState;
  };
};

const MenuContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <MenuContext.Provider value={value}>
      {props.children}
    </MenuContext.Provider>
  );
};

const MenuContextConsumer = MenuContext.Consumer;

export { MenuContext, MenuContextProvider, MenuContextConsumer };