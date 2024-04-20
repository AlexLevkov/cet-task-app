import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
};

export const counterSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    updateTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { updateTickets } = counterSlice.actions;

export default counterSlice.reducer;
