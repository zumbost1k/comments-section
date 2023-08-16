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
                if (p.postId === id) {
                    return { ...p, quantityOflikes: quantityOflikes };
                }
                return p;
            });
        },
        changeAnswerText: (state, action) => {
            const { id, newAnswerText } = action.payload;
            state.allCommentsList = state.allCommentsList.map(comment => {
                return {
                    ...comment,
                    answers: comment.answers.map(answer => answer.answerId === id
                        ? { ...answer, answerText: newAnswerText }
                        : answer)
                };
            })
        },
        deleteComment: (state, action) => {
            state.allCommentsList = state.allCommentsList.filter((comment) => comment.postId !== action.payload)
        },
        deleteAnswer: (state, action) => {
            state.allCommentsList = state.allCommentsList.map(comment => {
                return {
                    ...comment,
                    answers: comment.answers.filter(answer => answer.answerId !== action.payload)
                };
            })
        },
        changeCommentText: (state, action) => {
            const { id, newCommentText } = action.payload;
            state.allCommentsList = state.allCommentsList.map(p => {
                if (p.postId === id) {
                    return { ...p, text: newCommentText };
                }
                return p;
            });
        },
        addAnswer: (state, action) => {
            const { relativeId, newAnswer } = action.payload;
            state.allCommentsList = state.allCommentsList.map(p => {
                if (p.postId === relativeId) {
                    return { ...p, answers: p.answers.concat(newAnswer) };
                }
                return p;
            });
        },
        changeQuantityAnswerLikes: (state, action) => {
            const { id, quantityOfAnswerLikes } = action.payload;
            state.allCommentsList = state.allCommentsList.map(comment => {
                return {
                    ...comment,
                    answers: comment.answers.map(answer => answer.answerId === id
                        ? { ...answer, quantityOfAnswerLikes: quantityOfAnswerLikes }
                        : answer)
                };
            })
        }

    }
})
export const { addComment, changeQuantityLikes, deleteComment, changeCommentText, addAnswer, deleteAnswer, changeQuantityAnswerLikes, changeAnswerText } = allCommentsSlice.actions
export default allCommentsSlice.reducer