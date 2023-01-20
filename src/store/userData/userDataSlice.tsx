import { createSlice } from "@reduxjs/toolkit";
import { UserDataSliceState } from "../../interfaces/slicesInterfaces";
import { userDataInitialState } from "../../interfaces/userData";

const initialState: UserDataSliceState = {
  userId: -1,
  isAdmin: 1,
  email: "",
  phone: "",
  userName: "",
  userData: userDataInitialState,
};

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    resetAll: () => {
      return initialState;
    },
  },
});

export const {
  setUserId,
  setAdmin,
  setEmail,
  setPhone,
  setUsername,
  setUserData,
  resetAll,
} = userDataSlice.actions;

export default userDataSlice.reducer;
