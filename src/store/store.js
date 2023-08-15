
import { configureStore } from '@reduxjs/toolkit';
import { allCommentsSlice } from '@/features/allComments/allComments';
import { allAccountsSlice } from '@/features/allAccounts/allAccounts';

export const store = configureStore({
    reducer: {
        allComments: allCommentsSlice.reducer,
        allAccounts: allAccountsSlice.reducer,
    }
})