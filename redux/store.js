import {configureStore} from '@reduxjs/toolkit';
import cvReducer from './cvSlice'; // Import the correct reducer

const store = configureStore({
  reducer: {
    cv: cvReducer, // Use cvReducer here instead of cv
  },
});

export default store;
