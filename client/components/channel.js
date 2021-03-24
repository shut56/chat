import React from 'react'
import { useSelector } from 'react-redux'

import ServerResponse from './common/server-response'

import ChannelMenu from './common/channel-settings/channel-menu'
import ChannelSettings from './common/channel-settings/channel-settings'

const Channel = () => {
  const { response } = useSelector((s) => s.userSettings)
  return (
    <div className="flex bg-gray-700 h-screen w-full">
      {response?.text && <ServerResponse />}
      <ChannelMenu />
      <ChannelSettings />
    </div>
  )
}

export default Channel
