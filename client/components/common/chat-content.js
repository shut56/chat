import React from 'react'

import ChannelHeader from './channel-header'
import MessageInput from './message-input'
import MessageHistory from './message-history'

const ChatContent = () => {
  return (
    <div className="flex flex-1 flex-col bg-gray-600 text-gray-100 min-w-0">
      <ChannelHeader />
      <MessageHistory />
      <MessageInput />
    </div>
  )
}

export default ChatContent
