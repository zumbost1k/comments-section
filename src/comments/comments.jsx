import React, { useState } from 'react';
import './comments.css'
import { useDispatch, useSelector } from 'react-redux';
import { allCommentsList } from '@/store/selectors';
import moment from 'moment';
import { changeCommentText, changeQuantityLikes, deleteComment } from '@/features/allComments/allComments';
import ReactModal from 'react-modal';
import Delete from '@/icons/delete';
import Edit from '@/icons/edit';
const dateDifference = (startDate) => {
    const endDate = moment().format('YYYY-MM-DD HH:mm')
    const startMoment = moment(startDate, 'YYYY-MM-DD HH:mm');
    const endMoment = moment(endDate, 'YYYY-MM-DD HH:mm');
    const diffDuration = moment.duration(endMoment.diff(startMoment));
    const days = diffDuration.asDays();
    const hours = diffDuration.asHours();
    const minutes = diffDuration.asMinutes();

    if (days >= 1) {
        return Math.floor(days) + ' days ago';
    } else if (hours >= 1) {
        return Math.floor(hours) + ' hours ago';
    } else {
        return Math.floor(minutes) + ' minutes ago';
    }
}



const AllCommentsList = ({ comment }) => {
    const [showModal, setShowModal] = useState(false)
    const [isEditable, setIsEditable] = useState(false);
    const [textareaValue, setTextareaValue] = useState(comment.text);

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };
    const dispatch = useDispatch()
    const changeQuantityLikesHandler = (newQuantityLikes) => {
        if (newQuantityLikes > 0) {
            dispatch(
                changeQuantityLikes({
                    id: comment.id,
                    quantityOflikes: newQuantityLikes
                })
            )
        }
    }

    return (

        <div className='comments_item' key={comment.id}>
            <div className='comment_user_info'>
                <img src={`/photos/photosForProfile/${comment.pathToProfilePhoto}`} alt={comment.userName} width='32' height='32' />
                <p className='comment_user_name'>{comment.userName} </p>
                <span className='its_you'>you</span>
                <p className='comment_user_date'>{dateDifference(comment.date)}</p>
            </div>
            {!isEditable ? <p className='comment_user_text'>{comment.text}</p> : <textarea value={textareaValue} onChange={handleTextareaChange} className='comment_user_text' />}
            <div className='quantity_of_likes_container'>
                <button type='button' className='quantity_calc_button' onClick={() => { changeQuantityLikesHandler(Number(comment.quantityOflikes) + 1) }}><img width='10' height='10' src='/photos/+.svg' alt='minus' /></button>
                <span className='quantity_of_likes_textholder'>{comment.quantityOflikes}</span>
                <button type='button' className='quantity_calc_button' onClick={() => { changeQuantityLikesHandler(Number(comment.quantityOflikes) - 1) }}><img width='10' height='10' src='/photos/-.svg' alt='minus' /></button>
            </div>
            <div className='delete_edit_buttons_container'>
                <button onClick={() => { setShowModal(true) }} disabled={isEditable} type='button' className='edit_comment_state_button delete_btn'><Delete /> Delete</button>
                <button type='button' disabled={isEditable} onClick={toggleEdit} className='edit_comment_state_button edit_btn'><Edit /> Edit</button>
            </div>
            <button disabled={!isEditable} className='udate_comment_text_btn' onClick={() => {
                toggleEdit()
                dispatch(changeCommentText({
                    id: comment.id,
                    newCommentText: textareaValue
                }))
            }}>UPDATE</button>
            <div className='modal_container'>
                <ReactModal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={showModal}
                    contentLabel='Minimal Modal Example'
                    ariaHideApp={false}
                >
                    <div>
                        <h3 className='modal_header'>Delete comment</h3>
                        <p className='modal_text'>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
                        <div className='modal_buttons'>
                            <button className='modal_btn modal_cancel' type='button' onClick={() => { setShowModal(false) }}>NO, CANCEL</button>
                            <button className='modal_btn modal_delete' type='button' onClick={() => {
                                setShowModal(false)
                                dispatch(deleteComment(comment.id))
                            }}>YES, DELETE</button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        </div >

    )
}

const Comment = () => {
    const allComments = useSelector(allCommentsList)
    return (
        <section className='all_comments'>
            {allComments.map(comment => { return <AllCommentsList comment={comment} /> })}
        </section>
    )
}

export default Comment