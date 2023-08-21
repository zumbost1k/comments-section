import React, { useState } from 'react';
import './addMessage.css'
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '@/features/allComments/allComments';
import { v4 } from 'uuid';
import moment from 'moment/moment';
import { allAccountsList,currentUser } from '@/store/selectors';
import { changeCurrentUser } from '@/features/currentUser/currentUser';
const AddMessage = () => {
    const allAccounts = useSelector(allAccountsList)
    const [currentTextAreaValue, setCurrentTextAreaValue] = useState('')
    const currentUserinfo = useSelector(currentUser)
    const dispatch = useDispatch()
    const addMessageHandler = (event) => {
        event.preventDefault();
        const messageInf = {
            postId: v4(),
            userId: currentUserinfo.id,
            text: currentTextAreaValue,
            date: moment().format('YYYY-MM-DD HH:mm'),
            quantityOflikes: 1,
            answers: []
        }
        dispatch(addComment({
            newComment: messageInf,
        }))
        setCurrentTextAreaValue('')
    }

    return (
        <section className='add_message_section'>
            <form onSubmit={addMessageHandler} className='message_form'>
                <textarea className='message_textarea' value={currentTextAreaValue} onChange={(event) => { setCurrentTextAreaValue(event.target.value) }} name='message' id='message' cols='30' rows='10' placeholder='Add a comment…' required />
                <img className='avatar' width='32' height='32' src={`/photos/photosForProfile/${currentUserinfo.pathToPhoto}`} alt='avatar' />
                <button className='send_message' type='submit'>SEND</button>
            </form>
            <select onChange={newUserId => {
                dispatch(changeCurrentUser(Number(newUserId.target.value)))
            }} name='user_names' id='user_names'>
                {allAccounts.map((account, index) => {
                    return (<option key={account.id} value={index}>{account.accountName}</option>)
                })}
            </select>
        </section>
    )


}

export default AddMessage