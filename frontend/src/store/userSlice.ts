import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Load user from localStorage on page refresh
const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
}

const initialState: UserState = initialUser || {
  id: null,
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Updates Redux state and stores user in localStorage.
     */
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    /**
     * Clears Redux state and removes user from localStorage.
     */
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
