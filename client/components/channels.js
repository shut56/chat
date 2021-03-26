import React from 'react'
import { useSelector } from 'react-redux'

import Sidebar from './common/sidebar'
import ChatContent from './common/chat-content'

const Channels = () => {
  const noChannels = useSelector((s) => s.channels.activeChannel) !== ''

  return (
    <div className="flex bg-gray-700 h-screen w-screen">
      <Sidebar />
      {noChannels && <ChatContent />}
    </div>
  )
}

export default Channels
