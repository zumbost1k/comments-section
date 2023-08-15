
import { configureStore } from '@reduxjs/toolkit';
import { allCommentsSlice } from '@/features/allComments/allComments';
import { allAccountsSlice } from '@/features/allAccounts/allAccounts';
import { CurrentUserSlice } from '@/features/currentUser/currentUser';

export const store = configureStore({
    reducer: {
        allComments: allCommentsSlice.reducer,
        allAccounts: allAccountsSlice.reducer,
        currentUser: CurrentUserSlice.reducer,
    }
})