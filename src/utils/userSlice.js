import { createSlice } from "@reduxjs/toolkit";
import { dummyUsers } from "./constants";

const initialState = {
  users: dummyUsers,
  globalFilter: "", // For global filtering
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGlobalFilter: (state, action) => {
      state.globalFilter = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload); // Add the new user to the users array
    },
    // You can add more actions as needed
  },
});

export const { setGlobalFilter, addUser } = userSlice.actions;

export default userSlice.reducer;
