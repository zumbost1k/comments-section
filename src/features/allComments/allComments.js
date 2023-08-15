import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCommentsList: [],
}

export const allCommentsSlice = createSlice({
    name: 'allComments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.allCommentsList = state.allCommentsList.concat(action.payload)
        },
        changeQuantityLikes: (state, action) => {
            const { id, quantityOflikes } = action.payload;
            state.allCommentsList = state.allCommentsList.map(p => {
                if (p.id === id) {
                    return { ...p, quantityOflikes: quantityOflikes };
                }
                return p;
            });
        }, deleteComment: (state, action) => {
            state.allCommentsList = state.allCommentsList.filter((comment) => comment.id !== action.payload)
        },
        changeCommentText: (state, action) => {
            const { id, newCommentText } = action.payload;
            state.allCommentsList = state.allCommentsList.map(p => {
                if (p.id === id) {
                    return { ...p, text: newCommentText };
                }
                return p;
            });
        },
    }
})



export const { addComment, changeQuantityLikes, deleteComment, changeCommentText } = allCommentsSlice.actions
export default allCommentsSlice.reducer