// store.js
import { configureStore } from '@reduxjs/toolkit';
import Features from '../Features/flightSlice';

const store = configureStore({
  reducer: {
    flights: Features
  }
});

export default store;
