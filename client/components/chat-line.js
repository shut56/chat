import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sendMessage, getCurrentMessage } from '../redux/reducers/messages'

const ChatLine = () => {
  const dispatch = useDispatch()
  const userMessage = useSelector((store) => store.messages.userMessage)
  const nickname = useSelector((store) => store.messages.nickname)

  const Submit = (key) => {
    if (key === 13) {
      dispatch(sendMessage())
    }
    return () => {
      dispatch(sendMessage())
    }
  }

  const onChangeMessage = (msg) => {
    return dispatch(getCurrentMessage(msg))
  }
  return (
    <div className="flex flex-row w-full bottom-0 fixed mb-2 px-2">
      <div className="font-bold text-black py-2">{nickname || 'User:'}</div>
      <input type="text" className="flex-1 border bg-gray-200 mx-2" placeholder="Type your message..." onChange={(e) => onChangeMessage(e.target.value)} onKeyPress={(e) => Submit(e.charCode)} value={userMessage} />
      <button type="button" className="border rounded text-white bg-blue-600 px-4 py-2" onClick={Submit()}>Send</button>
    </div>
  )
}

export default ChatLine
