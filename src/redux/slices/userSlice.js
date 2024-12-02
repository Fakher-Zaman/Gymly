import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null, // Store user data
        isLoggedIn: false, // Track login status
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.userData = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
