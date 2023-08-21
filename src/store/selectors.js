export const allCommentsList = state => state.allComments.allCommentsList
export const allAccountsList = state => state.allAccounts.allAccountsList
export const currentUser = state => state.allAccounts.allAccountsList[state.currentUser.CurrentUser]
