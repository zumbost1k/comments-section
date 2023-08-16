import React, { useState } from 'react';
import './comments.css'
import { useDispatch, useSelector } from 'react-redux';
import { allCommentsList } from '@/store/selectors';
import moment from 'moment';
import { changeCommentText, changeQuantityLikes, deleteComment } from '@/features/allComments/allComments';
import ReactModal from 'react-modal';
import Delete from '@/icons/delete';
import Edit from '@/icons/edit';
import { currentUser } from '@/store/selectors';
import { v4 } from 'uuid';
import { addAnswer, changeQuantityAnswerLikes, deleteAnswer } from '@/features/allComments/allComments';
import { changeAnswerText } from '../features/allComments/allComments';
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


const ReplyBody = ({ addAnswerHandler, replyText, setReplyText, currentAvatarPhoto }) => {
    return (
        <form onSubmit={addAnswerHandler} className='answer_form'>
            <textarea value={replyText} onChange={(newText) => { setReplyText(newText.target.value) }} className='message_textarea' name='message' id='message' cols='30' rows='10' placeholder='Add a reply…' required />
            <img className='avatar' width='32' height='32' src={`/photos/photosForProfile/${currentAvatarPhoto}`} alt='avatar' />
            <button className='send_message' type='submit'>REPLY</button>
        </form>
    )
}


const AllCommentsList = ({ comment }) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalAnswer, setShowModalAnswer] = useState(false)
    const [isEditable, setIsEditable] = useState(false);
    const [isEditableAnswer, setIsEditableAnswer] = useState(false);
    const [textareaValue, setTextareaValue] = useState(comment.text);
    const [isReplying, setIsReplying] = useState(false)
    const [replyText, setReplyText] = useState(`@${comment.userName}`)
    const currentUserInfo = useSelector(currentUser)
    const isCurrentUserComment = currentUserInfo.id === comment.userId
    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const addAnswerHandler = (event) => {
        event.preventDefault();
        const AnswerInf = {
            answerId: v4(),
            userAnswerId: currentUserInfo.id,
            answerText: replyText,
            userNameAnswer: currentUserInfo.accountName,
            answerDate: moment().format('YYYY-MM-DD HH:mm'),
            pathToProfilePhotoAnswer: currentUserInfo.pathToPhoto,
            quantityOfAnswerLikes: 1
        }
        dispatch(addAnswer(
            {
                relativeId: comment.postId,
                newAnswer: AnswerInf
            }
        ))
        setReplyText('')
        setIsReplying(false)
    }
    const dispatch = useDispatch()
    const changeQuantityLikesHandler = (newQuantityLikes) => {
        if (newQuantityLikes > 0) {
            dispatch(
                changeQuantityLikes({
                    id: comment.postId,
                    quantityOflikes: newQuantityLikes
                })
            )
        }
    }

    const changeQuantityAnswerLikesHandler = (answerId, newQuantityLikes) => {
        if (newQuantityLikes > 0) {
            dispatch(
                changeQuantityAnswerLikes({
                    id: answerId,
                    quantityOfAnswerLikes: newQuantityLikes
                })
            )
        }
    }

    return (
        <div key={comment.postId}>
            <div className='comments_item' >
                <div className='comment_user_info'>
                    <img src={`/photos/photosForProfile/${comment.pathToProfilePhoto}`} alt={comment.userName} width='32' height='32' />
                    <p className='comment_user_name'>{comment.userName} </p>
                    {isCurrentUserComment && <span className='its_you'>you</span>}
                    <p className='comment_user_date'>{dateDifference(comment.date)}</p>
                </div>
                {!isEditable ? <p className='comment_user_text'>{comment.text}</p> : <textarea value={textareaValue} onChange={handleTextareaChange} className='comment_user_text' />}
                <div className='quantity_of_likes_container'>
                    <button type='button' className='quantity_calc_button' onClick={() => { changeQuantityLikesHandler(Number(comment.quantityOflikes) + 1) }}><img width='10' height='10' src='/photos/+.svg' alt='minus' /></button>
                    <span className='quantity_of_likes_textholder'>{comment.quantityOflikes}</span>
                    <button type='button' className='quantity_calc_button' onClick={() => { changeQuantityLikesHandler(Number(comment.quantityOflikes) - 1) }}><img width='10' height='10' src='/photos/-.svg' alt='minus' /></button>
                </div>
                {isCurrentUserComment ? <div className='delete_edit_buttons_container'>
                    <button onClick={() => { setShowModal(true) }} disabled={isEditable} type='button' className='edit_comment_state_button delete_btn'><Delete /> Delete</button>
                    <button type='button' disabled={isEditable} onClick={toggleEdit} className='edit_comment_state_button edit_btn'><Edit /> Edit</button>
                </div> : <button className='delete_edit_buttons_container reply_btn' onClick={() => { setIsReplying(!isReplying) }} type='button'><img src='/photos/Reply.svg' alt='reply' width='14' height='13' /><span className='reply_text'>Reply</span> </button>}
                <button disabled={!isEditable} className='udate_comment_text_btn' onClick={() => {
                    toggleEdit()
                    dispatch(changeCommentText({
                        id: comment.postId,
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
                                    dispatch(deleteComment(comment.postId))
                                }}>YES, DELETE</button>
                            </div>
                        </div>
                    </ReactModal>
                </div>

            </div >
            <div className='reply_container'>
                {comment.answers.map((answer) => {
                    return (
                        <div key={answer.answerId} className='comments_item' >
                            <div className='comment_user_info'>
                                <img src={`/photos/photosForProfile/${answer.pathToProfilePhotoAnswer}`} alt={answer.userNameAnswer} width='32' height='32' />
                                <p className='comment_user_name'>{answer.userNameAnswer} </p>
                                {currentUserInfo.id === answer.userAnswerId && <span className='its_you'>you</span>}
                                <p className='comment_user_date'>{dateDifference(answer.answerDate)}</p>
                            </div>
                            {!isEditableAnswer ? <p className='comment_user_text'>{answer.answerText}</p> : <textarea value={answer.answerText} onChange={(event) => {
                                dispatch(changeAnswerText({
                                    id: answer.answerId,
                                    newAnswerText: event.target.value
                                }))
                            }} className='comment_user_text' />}
                            <div className='quantity_of_likes_container'>
                                <button type='button' className='quantity_calc_button' onClick={() => { changeQuantityAnswerLikesHandler(answer.answerId, (Number(answer.quantityOfAnswerLikes) + 1)) }}><img width='10' height='10' src='/photos/+.svg' alt='minus' /></button>
                                <span className='quantity_of_likes_textholder'>{answer.quantityOfAnswerLikes}</span>
                                <button type='button' className='quantity_calc_button' onClick={() => { changeQuantityAnswerLikesHandler(answer.answerId, (Number(answer.quantityOfAnswerLikes) + 1)) }}><img width='10' height='10' src='/photos/-.svg' alt='minus' /></button>
                            </div>
                            {currentUserInfo.id === answer.userAnswerId ? <div className='delete_edit_buttons_container'>
                                <button onClick={() => { setShowModalAnswer(true) }} disabled={isEditableAnswer} type='button' className='edit_comment_state_button delete_btn'><Delete /> Delete</button>
                                <button type='button' disabled={isEditableAnswer} onClick={() => { setIsEditableAnswer(!isEditableAnswer) }} className='edit_comment_state_button edit_btn'><Edit /> Edit</button>
                            </div> : <button className='delete_edit_buttons_container reply_btn'
                                onClick={() => {
                                    setReplyText(`@${answer.userNameAnswer}`)
                                    setIsReplying(!isReplying)
                                }}

                                type='button'><img src='/photos/Reply.svg' alt='reply' width='14' height='13' /><span className='reply_text'>Reply</span> </button>}
                            <button disabled={!isEditableAnswer} className='udate_comment_text_btn' onClick={() => {
                                setIsEditableAnswer(!isEditableAnswer)
                            }}>UPDATE</button>
                            <div className='modal_container'>
                                <ReactModal
                                    className='modal'
                                    overlayClassName='overlay'
                                    isOpen={showModalAnswer}
                                    contentLabel='Minimal Modal Example'
                                    ariaHideApp={false}
                                >
                                    <div>
                                        <h3 className='modal_header'>Delete comment</h3>
                                        <p className='modal_text'>Are you sure you want to delete this answer? This will remove the comment and can’t be undone.</p>
                                        <div className='modal_buttons'>
                                            <button className='modal_btn modal_cancel' type='button' onClick={() => { setShowModalAnswer(false) }}>NO, CANCEL</button>
                                            <button className='modal_btn modal_delete' type='button' onClick={() => {
                                                setShowModalAnswer(false)
                                                dispatch(deleteAnswer(answer.answerId))
                                            }}>YES, DELETE</button>
                                        </div>
                                    </div>
                                </ReactModal>
                            </div>
                        </div >
                    )
                })
                }
                {isReplying &&
                    <ReplyBody addAnswerHandler={addAnswerHandler} replyText={replyText} setReplyText={setReplyText} currentAvatarPhoto={currentUserInfo.pathToPhoto} />
                }
            </div>


        </div>


    )
}

const Comment = () => {
    const allComments = useSelector(allCommentsList)
    console.log(allComments)
    return (
        <section className='all_comments'>
            {allComments.map(comment => { return <AllCommentsList comment={comment} /> })}
        </section>
    )
}

export default Comment