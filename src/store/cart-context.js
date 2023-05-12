import { createContext, useEffect, useReducer } from "react";

import { fetchRequest } from "../components/lib/fetApi";

export const cartContext = createContext({
  items: [],
  totalAmount: 0,
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return (state = action.payload);

    case "GET_BASKET":
      return (state = action.payload);

    case "INCREMENT_ITEM":
      return (state = action.payload);

    case "DECREMENT_ITEM":
      return (state = action.payload);
  }
  return state;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);

  const addItem = async (amount, id) => {
    try {
      const response = await fetchRequest(`/foods/${id}/addToBasket`, {
        method: "POST",
        body: { amount: amount },
      });
      dispatch({ type: "ADD_ITEM", payload: response.items });
    } catch (error) {
      new Error(error);
    }
  };

  const getBasket = async () => {
    try {
      const response = await fetchRequest(`/basket`);

      dispatch({ type: "GET_BASKET", payload: response.items });
    } catch (error) {
      new Error(error);
    }
  };

  const Decrement = async (id, amount) => {
    try {
      if (amount !== 1) {
        const response = await fetchRequest(`/basketItem/${id}/update`, {
          method: "PUT",
          body: { amount: amount - 1 },
        });
        dispatch({ type: "DECREMENT_ITEM", payload: response.items });
        getBasket();
      } else {
        const response = await fetchRequest(`/basketItem/${id}/delete`, {
          method: "DELETE",
        });
        dispatch({ type: "DECREMENT_ITEM", payload: response.items });
      }
    } catch (error) {
      new Error(error);
    }
  };

  const Increment = async (id, amount) => {
    try {
      const response = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount + 1 },
      });

      dispatch({ type: "INCREMENT_ITEM", payload: response.items });
      getBasket();
    } catch (error) {
      new Error(error);
    }
  };

  const getTotalAmount = cartState?.reduce(
    (sum, { price, amount }) => sum + amount * price,
    0
  );
  useEffect(() => {
    getBasket();
  }, []);

  const amount = cartState?.reduce((prev, current) => prev + current.amount, 0);

  const cartValue = {
    items: cartState,
    addItem,
    totalPrise: amount,

    getTotalAmount,
    Increment,
    Decrement,
    basket: cartState,
  };
  return (
    <cartContext.Provider value={cartValue}> {children}</cartContext.Provider>
  );
};
export default CartProvider;
