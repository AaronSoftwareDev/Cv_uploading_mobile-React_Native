import {createSlice} from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'CV',
  initialState: {
    items: [],
    newitems: [],
    newitems2: [],
    profileData: [],
    employerData: [],
    tableNum: '',
    userinfor: '',
    userinfor1: '',
    loginstate: [],
    jobseeker: [],
  },
  reducers: {
    addNewProfileData: (state, action) => {
      state.profileData = action.payload;
      // console.log('Profile data:', state.profileData);
    },
    addEmployerData: (state, action) => {
      state.employerData = action.payload;
      // console.log('employer data:', state.employerData);
    },

    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    addJobSeeker: (state, action) => {
      state.jobseeker.push(action.payload);
      console.log('job seeker id data to view', state.jobseeker);
    },
    addLoginState: (state, action) => {
      // state.loginstate.push(action.payload);
      state.loginstate = action.payload;
      // console.log('the user login data', state.loginstate);
    },

    clearItems: (state, action) => {
      state.items = [];
      state.newitems = [];
      state.tableNum = '';
      state.userinfor = '';
      state.userinfor1 = '';
      state.loginstate = [];
      state.jobseeker = [];
    },
    clearItems2: (state, action) => {
      state.profileData = [];
    },
    clearItems3: (state, action) => {
      state.jobseeker = [];
    },
    clearItems4: (state, action) => {
      state.newitems2 = [];
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
      // console.log('dispatched data ', state.newitems);
    },
    addNewItem2: (state, action) => {
      state.newitems2.push(action.payload);
      console.log('dispatched agent data ', state.newitems2);
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
  addNewItem2,
  addTable,
  addUserinfor,
  addUserinfor1,
  addLoginState,
  addJobSeeker,
  clearItems,
  clearItems2,
  clearItems3,
  clearItems4,
  addNewProfileData,
  addEmployerData,
} = cvSlice.actions;

export default cvSlice.reducer;
