import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { sendMessage } from '../redux/reducers/messages'

const Main = () => {
  const [userMessage, setUserMessage] = useState('')
  const dispatch = useDispatch()
  const messageHistory = useSelector((store) => store.messages.messageHistory)

  const Submit = () => {
    return () => {
      dispatch(sendMessage({ name: 'Test User', text: userMessage }))
      setUserMessage('')
    }
  }
  return (
    <div>
      <ul id="messages">
        {messageHistory.map((message, id) => {
          return (
            <li key={`${message.name}${id}`}>{`${message.name}: ${message.text}`}</li>
          )
        })}
      </ul>
      <form action="">
        <input id="m" autoComplete="off" onChange={(e) => setUserMessage(e.target.value)} value={userMessage} />
        <button type="button" onClick={Submit()}>Send</button>
      </form>
    </div>
  )
}

export default Main
