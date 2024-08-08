import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          total: newItem.price,
          thumbnail: newItem.thumbnail,
        });
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      } else {
        existingItem.quantity++;
        existingItem.total += newItem.price;
        state.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity--;
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total += existingItem.price;
        state.totalPrice += existingItem.price;
      }
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
        state.totalPrice -= existingItem.price;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
