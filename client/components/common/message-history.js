import React from 'react'
import { useSelector } from 'react-redux'

import Message from './message'

const MessageHistory = () => {
  const { messageHistory } = useSelector((store) => store.messages)

  return (
    <div id="message-history" className="px-6 py-4 overflow-y-auto h-full">
      {messageHistory.map((message, id) => {
        return (
          <div key={`${message.name}${id}`}>
            <Message message={message} />
          </div>
        )
      })}
      <div id="history-end" />
    </div>
  )
}

export default MessageHistory
