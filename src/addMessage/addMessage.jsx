import React, { useState } from 'react';
import './addMessage.css'
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '@/features/allComments/allComments';
import { v4 } from 'uuid';
import moment from 'moment/moment';
import { allAccountsList } from '@/store/selectors';
const AddMessage = () => {
    const allAccounts = useSelector(allAccountsList)
    console.log(allAccounts)
    const [currentTextAreaValue, setCurrentTextAreaValue] = useState('')
    const [currentUser, setCurrentUser] = useState(allAccounts[0])
    const dispatch = useDispatch()
    const addMessageHandler = (event) => {
        event.preventDefault();
        const messagetInf = {
            id: v4(),
            text: currentTextAreaValue,
            userName: currentUser.accountName,
            date: moment().format('YYYY-MM-DD HH:mm'),
            pathToProfilePhoto: currentUser.pathToPhoto,
            quantityOflikes: 1
        }
        dispatch(addComment(messagetInf))
        setCurrentTextAreaValue('')
    }
    if (allAccounts) {

        return (
            <section className='add_message_section'>
                <form onSubmit={addMessageHandler} className='message_form'>
                    <textarea className='message_textarea' value={currentTextAreaValue} onChange={(event) => { setCurrentTextAreaValue(event.target.value) }} name='message' id='message' cols='30' rows='10' placeholder='Add a comment…' required />
                    <img className='avatar' width='32' height='32' src={`/photos/photosForProfile/${currentUser.pathToPhoto}`} alt='avatar' />
                    <button className='send_message' type='submit'>SEND</button>
                </form>
                <select onChange={newUserId => { setCurrentUser(allAccounts.find(account => account.id === newUserId.target.value)) }} name='user_names' id='user_names'>
                    {allAccounts.map(account => {
                        return (<option value={account.id}><p>{account.accountName}</p></option>)
                    })}
                </select>
            </section>
        )
    }

}

export default AddMessage