import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    additem: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteitem: (state, action) => {
      // delee with pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    icreaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteitem(state, action);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  additem,
  clearCart,
  decreaseItemQuantity,
  deleteitem,
  icreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

// selecter functions
export const getTotalCartQuatity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
