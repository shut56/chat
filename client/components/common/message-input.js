import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sendMessage } from '../../redux/reducers/messages'

const MessageInput = () => {
  const dispatch = useDispatch()
  const [userMessage, setUserMessage] = useState('')
  const { activeChannel } = useSelector((store) => store.channels)
  // const nickname = useSelector((store) => store.messages.nickname)

  const Submit = (key) => {
    if (key === 13) {
      dispatch(sendMessage(activeChannel, userMessage))
      setUserMessage('')
    }
    // return () => {
    //   dispatch(sendMessage(activeChannel, userMessage))
    //   setUserMessage('')
    // }
  }

  const onChangeMessage = (msg) => {
    return setUserMessage(msg)
  }

  return (
    <div className="flex flex-row bg-gray-600 bottom-0 w-full">
      <div className="flex mx-2 mb-4 rounded-lg bg-white overflow-hidden w-full">
        <button type="button" className="m-2 font-bold text-white h-6 w-6 rounded-full border-gray bg-gray-500 opacity-60 hover:opacity-100 z-0">+</button>
        <input type="text" className="px-2 text-black focus:outline-none w-full" placeholder="Message to #general" onChange={(e) => onChangeMessage(e.target.value)} onKeyPress={(e) => Submit(e.charCode)} value={userMessage} />
      </div>
    </div>
  )
}

export default MessageInput
