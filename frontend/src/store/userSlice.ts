import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload }; // Ensure all fields are updated
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearUser: () => initialState, // Reset to initial state
  },
});

export const { setUser, updateUserName, clearUser } = userSlice.actions;
export default userSlice.reducer;
