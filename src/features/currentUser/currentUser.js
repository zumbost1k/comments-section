import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    CurrentUser: ''
}

export const CurrentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        changeCurrentUser: (state, action) => {
            state.CurrentUser = ''.concat(action.payload)
        },
    }
})

export const { changeCurrentUser } = CurrentUserSlice.actions
export default CurrentUserSlice.reducer