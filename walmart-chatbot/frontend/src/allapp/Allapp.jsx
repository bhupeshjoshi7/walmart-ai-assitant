import React, { useReducer } from 'react';

function Allapp() {
  const initialValue = 0;

  function init(value) {
    return { count: value };
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      case 'RESET':
        return init(action.payload);
      default:
        throw new Error('Unknown action type');
    }
  }

  const [state, dispatch] = useReducer(reducer, initialValue, init);

  return (
    <>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'RESET', payload: initialValue })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </>
  );
}

export default Allapp;
