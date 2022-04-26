import { initialState } from "./cart-context";

export const reducer = (state, action) => {
  let foundProduct = {};
  let index;
  if (action.type === "INCREASE_QTY") {
    return {
      ...state,
      qty: state.qty + 1,
    };
  }

  if (action.type === "DECREASE_QTY") {
    return {
      ...state,
      qty: state.qty - 1,
    };
  }

  if (action.type === "UPDATE_TOTAL_PRICE") {
    const p = action.payload.product;
    const q = action.payload.quantity;

    return {
      ...state,
      totalPrice: state.totalPrice + p.price * q,
    };
  }

  if (action.type === "UPDATE_TOTAL_QUANTITY") {
    const p = action.payload.product;
    const q = action.payload.quantity;

    return {
      ...state,
      totalQuantities: state.totalQuantities + q,
      qty: 1,
    };
  }

  if (action.type === "UPDATE_CART_ITEMS") {
    const p = action.payload.product;
    const q = action.payload.quantity;

    const checkProductInCart = state.cartItems.find(
      (item) => item._id === p._id
    );

    if (checkProductInCart) {
      const updatedCartItems = state.cartItems.map((item) => {
        if (item._id === p._id) {
          return {
            ...item,
            quantity: item.quantity + q,
          };
        }
      });

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    } else {
      p.quantity = q;
      return {
        ...state,
        cartItems: [...state.cartItems, { ...p }],
      };
    }
  }

  if (action.type === "SHOW_CART") {
    return {
      ...state,
      showCart: true,
    };
  }

  if (action.type === "HIDE_CART") {
    return {
      ...state,
      showCart: false,
    };
  }

  if (action.type === "DELETE_PRODUCT") {
    const filteredCartItems = state.cartItems.filter(
      (item) => item._id !== action.payload._id
    );

    return {
      ...state,
      cartItems: filteredCartItems,
      totalQuantities: state.totalQuantities - action.payload.quantity,
      totalPrice:
        state.totalPrice - action.payload.quantity * action.payload.price,
    };
  }

  if (action.type === "UPDATE_SPECIFIC_PRODUCT_QUANTITY") {
    const { id, value } = action.payload;
    foundProduct = state.cartItems.find((item) => item._id === id);
    index = state.cartItems.findIndex((item) => item._id === id);

    const filteredCartItems = state.cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      return {
        ...state,
        cartItems: [
          ...filteredCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ],
        totalQuantities: state.totalQuantities + 1,
        totalPrice: state.totalPrice + foundProduct.price,
      };
    } else if (value === "dec") {
      return {
        ...state,
        cartItems: [
          ...filteredCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ],
        totalQuantities: state.totalQuantities - 1,
        totalPrice: state.totalPrice - foundProduct.price,
      };
    }
  }

  if (action.type === "SET_TO_DEFAULT") {
    return {
      ...initialState,
    };
  }

  throw new Error("This action is not defined");
};
