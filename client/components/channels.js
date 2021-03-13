import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from './common/sidebar'
import ChatContent from './common/chat-content'
import ChannelCreator from './common/channel-creator'
import BlackScreen from './common/black-screen'

import { getSocketId } from '../redux/reducers/users'

const Channels = () => {
  const dispatch = useDispatch()
  const channelCreatorToggle = useSelector((s) => s.secondary.channelCreatorToggle)
  const noChannels = useSelector((s) => s.channels.activeChannel) !== ''

  dispatch(getSocketId())
  return (
    <div className="flex bg-gray-700 h-screen w-screen">
      {channelCreatorToggle && <BlackScreen />}
      {channelCreatorToggle && <ChannelCreator />}
      <Sidebar />
      {noChannels && <ChatContent />}
    </div>
  )
}

export default Channels
