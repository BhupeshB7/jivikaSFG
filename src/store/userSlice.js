import { createSlice } from "@reduxjs/toolkit";
const loadUserData = () => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    const now = new Date().getTime();
    if (now < parsedUser.expiry) {
      return parsedUser.userData;
    }
    localStorage.removeItem("user");
  }
  return null;
};

const saveUserData = (userData) => {
  const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
  localStorage.setItem("user", JSON.stringify({ userData, expiry }));
};

// Initial state using the loadUserData function
const initialState = {
  status: !!loadUserData(),
  user: loadUserData(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.status = true;
      state.user = action.payload;
      saveUserData(action.payload);
    },
    clearUser: (state) => {
      state.status = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
