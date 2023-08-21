import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    CurrentUser: 0
}

export const CurrentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        changeCurrentUser: (state, action) => {
            state.CurrentUser = action.payload
        },
    }
})

export const { changeCurrentUser } = CurrentUserSlice.actions
export default CurrentUserSlice.reducer