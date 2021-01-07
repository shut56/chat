import React from 'react'

import ServerBlock from './server-block'
import UserBlock from './user-block'
import Channels from './channels'
import DirectMessages from './direct-messages'
import Applications from './applications'

const Sidebar = () => {
  return (
    <div className="bg-gray-700 text-gray-400 w-1/5 pb-6 hidden md:block">
      <ServerBlock />
      <UserBlock />
      <Channels />
      <DirectMessages />
      <Applications />
    </div>
  )
}

export default Sidebar
