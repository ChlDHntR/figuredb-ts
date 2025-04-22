import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice/userSlice";
import userReducer from "../features/userSlice/userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch =  typeof store.dispatch