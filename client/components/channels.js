import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from './common/sidebar'
import ChatContent from './common/chat-content'
import ChannelCreator from './common/channel-creator'
import ChannelSettings from './channel'
// import { getSocketId } from '../redux/reducers/users'

const Channels = () => {
  const dispatch = useDispatch()
  const { channelCreatorToggle, channelSettingsToggle } = useSelector((s) => s.secondary)
  const noChannels = useSelector((s) => s.channels.activeChannel) !== ''

  // dispatch(getSocketId())
  console.log('Check channels.js', dispatch?.id)
  return (
    <div className="flex bg-gray-700 h-screen w-screen">
      {channelCreatorToggle && <ChannelCreator />}
      {channelSettingsToggle && <ChannelSettings />}
      <Sidebar />
      {noChannels && <ChatContent />}
    </div>
  )
}

export default Channels
