import { createContext, useContext, useReducer } from "react";
//import logger from "use-reducer-logger";

export const Store = createContext(null);

const initialState = {
    cart: {
      cartItems: []
    }
};



  function reducer(state, action) {
    switch (action.type) {
      case 'CART_ADD_ITEM': {
     
        //add to cart 
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find((item) => item._id  === newItem._id);
      
        const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) 
        : [...state.cart.cartItems, newItem];

        return {...state, cart: {...state.cart, cartItems: cartItems}};
      }
      default:
        return state;
    }
  }



export function StoreProvider(props) {
    const [state, ctxDispatch] = useReducer(reducer, initialState);

    if (!props) {
        throw new Error("StoreProvider requires a props object");
    }

    if (!props.children) {
        throw new Error("StoreProvider requires a children prop");
    }

    if (typeof props.children !== "object" || Array.isArray(props.children)) {
        throw new Error("StoreProvider's children prop must be a single React element");
    }

    const value = {state, ctxDispatch};
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );
}

export const useStore = () => useContext(Store);