import React, { createContext, useReducer, useEffect } from 'react';
import { initialState, reducer } from '../../utility/reducer'; // Your existing reducer and initialState
import { auth } from '../../utility/firebase'; // Firebase Auth
import { onAuthStateChanged } from 'firebase/auth'; // Firebase listener for auth state changes

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Retrieve the initial basket from localStorage or fallback to initialState
  const localBasket = JSON.parse(localStorage.getItem('basket')) || initialState.basket;

  const [state, dispatch] = useReducer(reducer, { ...initialState, basket: localBasket });

  // UseEffect to store the basket in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(state.basket));
  }, [state.basket]);

  // Firebase Auth listener for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // If there's an authenticated user, dispatch user data to the context
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // If no user, set user to null
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    // Cleanup the listener on component unmount
    return unsubscribe;
  }, []);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
