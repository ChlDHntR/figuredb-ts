import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string,
    username: string,
    pwd: string,
    list: any
}

const initialState: any = {
    value: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUser: (state) => {
            state.value = null
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.value = action.payload
        }
    }
})

export const { removeUser, setUser } = userSlice.actions

export default userSlice.reducer