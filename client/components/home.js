import React from 'react'
import { useSelector } from 'react-redux'

import Sidebar from './common/sidebar'
import ChatContent from './common/chat-content'
import ChannelCreator from './common/channel-creator'
import BlackScreen from './common/black-screen'

const Home = () => {
  const channelCreatorToggle = useSelector((s) => s.secondary.channelCreatorToggle)
  return (
    <div className="flex bg-gray-700 h-screen w-full">
      {channelCreatorToggle && <BlackScreen />}
      {channelCreatorToggle && <ChannelCreator />}
      <Sidebar />
      <ChatContent />
    </div>
  )
}

export default Home
