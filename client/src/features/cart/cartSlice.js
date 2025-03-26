import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find((x) => x._id === item._id);

      if (existItem) {
        state.items = state.items.map((x) =>
          x._id === existItem._id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        state.items = [...state.items, { ...item, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items = state.items.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
