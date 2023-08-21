import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCommentsList: [],
}

export const allCommentsSlice = createSlice({
    name: 'allComments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            const { id, newComment } = action.payload;
            const addAnswerToComment = (data, parentId, newObject) => {
                if (!parentId) {
                    return data.concat(newObject);
                }
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (item.postId === parentId) {
                        item.answers = item.answers.concat(newObject);
                        return data;
                    }
                    if (item.answers) {
                        addAnswerToComment(item.answers, parentId, newObject);
                    }
                }

                return data;
            }
            state.allCommentsList = addAnswerToComment(state.allCommentsList, id, newComment)
        },
        changeQuantityLikes: (state, action) => {
            const { id, quantityOflikes } = action.payload;
            const updateTextById = (array, targetId, quantityOflikes) => {
                return array.map(item => {
                    if (item.postId === targetId) {
                        return { ...item, quantityOflikes: quantityOflikes };
                    } else if (item.answers) {
                        return { ...item, answers: updateTextById(item.answers, targetId, quantityOflikes) };
                    } else {
                        return item;
                    }
                });
            }
            state.allCommentsList = updateTextById(state.allCommentsList, id, quantityOflikes)
        },
        deleteComment: (state, action) => {
            const removeComment = (data, postIdToRemove) => {
                return data.map(obj => {
                    if (obj.answers && Array.isArray(obj.answers)) {
                        const filteredAnswers = removeComment(obj.answers, postIdToRemove);
                        return {
                            ...obj,
                            answers: filteredAnswers
                        };
                    }
                    return obj;
                }).filter(obj => obj.postId !== postIdToRemove);
            }
            state.allCommentsList = removeComment(state.allCommentsList, action.payload)
        },
        changeCommentText: (state, action) => {
            const { id, newCommentText } = action.payload;
            const updateTextById = (array, targetId, newText) => {
                return array.map(item => {
                    if (item.postId === targetId) {
                        return { ...item, text: newText };
                    } else if (item.answers) {
                        return { ...item, answers: updateTextById(item.answers, targetId, newText) };
                    } else {
                        return item;
                    }
                });
            }
            state.allCommentsList = updateTextById(state.allCommentsList, id, newCommentText)
        }

    }
})
export const { addComment, changeQuantityLikes, deleteComment, changeCommentText, } = allCommentsSlice.actions
export default allCommentsSlice.reducer

