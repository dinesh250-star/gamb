import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
// const initialState = {
//   users: [],
// };

const dbSlice = createSlice({
  name: "db",
  initialState: {
    users: [],
    count: 0,
  },
  reducers: {
    fetchUserData(state, action) {
      const user = action.payload;
      state.users.push({
        id: user.id,
        address: user.address,
        deposited_amount: user.deposited_amount,
        coins: user.coins,
        user_name: user.user_name,
      });
    },
    increment(state, action) {
      state.count += 1;
    },
    authentication(state, action) {
      const acc = action.payload;
      const exists = state.users.findIndex((user) => user.address == acc[0]);
      console.log(exists);
      if (exists == -1) {
        alert("Successfully registered");
      } else {
        alert("Already Registered");
      }
    },
  },
});

export const dbActions = dbSlice.actions;

export default dbSlice;
