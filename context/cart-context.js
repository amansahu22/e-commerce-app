import React, { useReducer, useContext, useEffect } from "react";
import { reducer } from "./reducer";
import { toast } from "react-hot-toast";

export const initialState = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};

const CartContext = React.createContext({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  addToCart: () => {},
  handleShowCart: () => {},
  handleHideCart: () => {},
  deleteCartProduct: () => {},
  updateCartItemQuantity: () => {},
  setToDefault: () => {},
});

export const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increaseQuantity = () => {
    if (state.qty < 10) {
      dispatch({ type: "INCREASE_QTY" });
    } else {
      return;
    }
  };

  const decreaseQuantity = () => {
    if (state.qty > 1) {
      dispatch({ type: "DECREASE_QTY" });
    } else {
      return;
    }
  };

  const addToCart = (product, quantity) => {
    dispatch({
      type: "UPDATE_CART_ITEMS",
      payload: { product, quantity },
    });

    dispatch({
      type: "UPDATE_TOTAL_PRICE",
      payload: { product, quantity },
    });

    dispatch({
      type: "UPDATE_TOTAL_QUANTITY",
      payload: { product, quantity },
    });

    toast.success(`${quantity} ${product.name} added to the cart`);
  };

  const handleShowCart = () => {
    dispatch({ type: "SHOW_CART" });
  };

  const handleHideCart = () => {
    dispatch({ type: "HIDE_CART" });
  };

  const deleteCartProduct = (product) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: product,
    });
  };

  const updateCartItemQuantity = (id, value) => {
    dispatch({
      type: "UPDATE_SPECIFIC_PRODUCT_QUANTITY",
      payload: {
        id,
        value,
      },
    });
  };

  const setToDefault = () => {
    dispatch({ type: "SET_TO_DEFAULT" });
  };


  return (
    <CartContext.Provider
      value={{
        ...state,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        handleHideCart,
        handleShowCart,
        deleteCartProduct,
        updateCartItemQuantity,
        setToDefault,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
