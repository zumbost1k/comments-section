import React from 'react';
import './commentsBody.css'
const Comment = React.lazy(() => import('@/comments/comments'));
const AddMessage = React.lazy(() => import('@/addMessage/addMessage'));
const CommentsBody = () => {
    return (
        <div className='comments_container'>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Comment />
                <AddMessage />
            </React.Suspense>

        </div>
    )
}

export default CommentsBody