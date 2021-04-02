import React from 'react'

import ChannelMenu from './common/channel-settings/channel-menu'
import ChannelSettings from './common/channel-settings/channel-settings'

const Channel = () => {
  return (
    <div className="flex bg-gray-700 h-screen w-full">
      <ChannelMenu />
      <ChannelSettings />
    </div>
  )
}

export default Channel
