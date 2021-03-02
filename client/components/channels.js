import React from 'react'
import { useSelector } from 'react-redux'

import Sidebar from './common/sidebar'
import ChatContent from './common/chat-content'
import ChannelCreator from './common/channel-creator'
import BlackScreen from './common/black-screen'

const Channels = () => {
  const channelCreatorToggle = useSelector((s) => s.secondary.channelCreatorToggle)
  const noChannels = useSelector((s) => s.channels.activeChannel) !== ''
  return (
    <div className="flex bg-gray-700 h-screen w-full">
      {channelCreatorToggle && <BlackScreen />}
      {channelCreatorToggle && <ChannelCreator />}
      <Sidebar />
      {noChannels && <ChatContent />}
    </div>
  )
}

export default Channels
