import { createSlice } from "@reduxjs/toolkit";
import { UserDataSliceState } from "../../interfaces/slicesInterfaces";

const initialState: UserDataSliceState = {
  userId: -1,
  isAdmin: 1,
  email: "",
  phone: "",
  pass: "",
  passRepeat: "",
  oldPass: "",
  userName: "",
  userData: "",
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
    setPass: (state, action) => {
      state.pass = action.payload;
    },
    setPassRepeat: (state, action) => {
      state.passRepeat = action.payload;
    },
    setOldPass: (state, action) => {
      state.oldPass = action.payload;
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setUserId,
  setAdmin,
  setEmail,
  setPhone,
  setPass,
  setPassRepeat,
  setOldPass,
  setUsername,
  setUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
