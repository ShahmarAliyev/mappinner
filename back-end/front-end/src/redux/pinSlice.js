import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinId: null,
};

const pinSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {
    setPinId: (state, action) => {
      return {
        ...state,
        pinId: action.payload,
      };
    },
  },
});

export const { setPinId } = pinSlice.actions;

export default pinSlice.reducer;
