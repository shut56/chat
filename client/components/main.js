import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { sendMessage, getMessageHistory, getCurrentMessage } from '../redux/reducers/messages'

const Main = () => {
  const dispatch = useDispatch()
  const messageHistory = useSelector((store) => store.messages.messageHistory)
  const userMessage = useSelector((store) => store.messages.userMessage)

  const Submit = () => {
    return () => {
      dispatch(sendMessage({ name: 'Test User', text: userMessage }))
      dispatch(getCurrentMessage(''))
    }
  }

  const onChangeMessage = (msg) => {
    return dispatch(getCurrentMessage(msg))
  }

  useEffect(() => {
    dispatch(getMessageHistory())
  }, [])
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
        <input id="m" autoComplete="off" onChange={(e) => onChangeMessage(e.target.value)} value={userMessage} />
        <button type="button" onClick={Submit()}>Send</button>
      </form>
    </div>
  )
}

export default Main
