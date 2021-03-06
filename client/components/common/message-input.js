import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sendMessage } from '../../redux/reducers/messages'

const MessageInput = () => {
  const dispatch = useDispatch()
  const [userMessage, setUserMessage] = useState('')
  const { activeChannel } = useSelector((store) => store.channels)
  const name = useSelector((s) => s.channels?.channelList[activeChannel]?.name)

  const Submit = (e) => {
    if (e.code === 'Enter' || e.which === 13) {
      dispatch(sendMessage(activeChannel, userMessage))
      setUserMessage('')
    }
  }

  return (
    <div className="flex flex-row bg-gray-600 bottom-0 w-full">
      <div className="flex mx-2 mb-2 rounded-lg bg-white overflow-hidden w-full">
        {/* <button type="button" className="flex justify-center items-center m-2 font-bold text-white h-6 w-6 rounded-full border-gray bg-gray-500 opacity-60 hover:opacity-100">+</button> */}
        <input type="text" className="p-2 text-black focus:outline-none w-full" placeholder={`Message #${name}`} onChange={(e) => setUserMessage(e.target.value)} onKeyPress={(e) => Submit(e)} value={userMessage} />
      </div>
    </div>
  )
}

export default MessageInput
