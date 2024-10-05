import { createContext, useContext, useReducer } from "react";
import logger from "use-reducer-logger";

export const Store = createContext(null);

const initialState = {
    cart: {
        cartItems: []
    }

};

function reducer(state, action) {
    switch (action.type) {
      case 'CART_ADD_ITEM':
        // add to cart
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, action.payload],
          },
        };
      default:
        return state;
    }
  }

export function StoreProvider(props) {
    const [state, ctx] = useReducer(logger(reducer), initialState);

    if (!props) {
        throw new Error("StoreProvider requires a props object");
    }

    if (!props.children) {
        throw new Error("StoreProvider requires a children prop");
    }

    if (typeof props.children !== "object" || Array.isArray(props.children)) {
        throw new Error("StoreProvider's children prop must be a single React element");
    }

    const value = {state, ctx};
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );
}

export const useStore = () => useContext(Store);