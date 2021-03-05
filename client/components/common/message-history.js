import React from 'react'
import { useSelector } from 'react-redux'

import Message from './message'

const MessageHistory = () => {
  const { messageHistory } = useSelector((store) => store.messages)
  const { userList } = useSelector((store) => store.users)

  return (
    <div id="message-history" className="px-6 py-4 overflow-y-auto h-full">
      {messageHistory.map((message) => {
        const name = userList[message.uid]?.name || 'Some user'
        return (
          <div key={`${message._id}`}>
            <Message message={message} name={name} />
          </div>
        )
      })}
      <div id="history-end" />
    </div>
  )
}

export default MessageHistory
