import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchParams: {},
  flights: [],
  user: JSON.parse(localStorage.getItem('user')) || null, // Change from array to null
  selectedFlight: null, // Add this for storing the selected flight
};

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    setFlights: (state, action) => {
      state.flights = action.payload.data.flights; // Adjust this line
    },
    setUser: (state, action) => {
      state.user = action.payload; // This will now be an object
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null; // Action to clear user
      localStorage.removeItem('user');
    },
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload; // Add this for setting the selected flight
    },
  },
});


export const { setSearchParams, setFlights, setUser, clearUser, setSelectedFlight } = flightSlice.actions;
export default flightSlice.reducer;
