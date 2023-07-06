import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../utils/Slices/userSlice';
import cartReducer from '../utils/Slices/cartSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
