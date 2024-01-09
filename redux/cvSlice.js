import {createSlice} from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'CV',
  initialState: {
    items: [],
    newitems: [],
    tableNum: '',
    userinfor: '',
    userinfor1: '',
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    addTable: (state, action) => {
      state.tableNum = action.payload;
    },
    addUserinfor: (state, action) => {
      state.userinfor = action.payload;
    },
    addUserinfor1: (state, action) => {
      state.userinfor1 = action.payload;
    },
    addNewItem: (state, action) => {
      state.newitems.push(...action.payload);
      console.log('dispatched data ', state.newitems);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.selectedQty = quantity;
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  addNewItem,
  addTable,
  addUserinfor,
  addUserinfor1,
} = cvSlice.actions;

export default cvSlice.reducer;
