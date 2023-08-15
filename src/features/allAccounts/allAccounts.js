import { createSlice } from '@reduxjs/toolkit'
import { v4 } from 'uuid'

const initialState = {
    allAccountsList: [
        {
            id: v4(),
            pathToPhoto: 'Oval.png',
            accountName: 'juliusomo'
        },
        {
            id: v4(),
            pathToPhoto: 'ramsesmiron.png',
            accountName: 'ramsesmiron'
        },
        {
            id: v4(),
            pathToPhoto: 'maxblagun.png',
            accountName: 'maxblagun'
        },
        {
            id: v4(),
            pathToPhoto: 'amyrobson.png',
            accountName: 'amyrobson'
        },
    ],
}

export const allAccountsSlice = createSlice({
    name: 'allAccounts',
    initialState,
    reducers: {

    }
})


export default allAccountsSlice.reducer