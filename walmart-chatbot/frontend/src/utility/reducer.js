import { Type } from './action.type';

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const itemExists = state.basket.some(item => item.id === action.item.id);

      if (itemExists) {
        return {
          ...state,
          basket: state.basket.map(item =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter(item => item.id !== action.id),
      };

    case Type.INCREMENT:
      return {
        ...state,
        basket: state.basket.map(item =>
          item.id === action.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ),
      };

    case Type.DECREMENT:
      return {
        ...state,
        basket: state.basket
          .map(item =>
            item.id === action.id
              ? { ...item, amount: item.amount - 1 }
              : item
          )
          .filter(item => item.amount > 0),
      };
     case Type.EMPTY_BASKET:
      return{
        ...state,
        basket: [],
      }
    // Handle user state update
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
