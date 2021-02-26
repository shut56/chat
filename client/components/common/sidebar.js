import React from 'react'

import { history } from '../../redux'

import ServerBlock from './server-block'
import UserBlock from './user-block'
import ChannelsList from './channels-list'
import DirectMessages from './direct-messages'
import Applications from './applications'

const Sidebar = () => {
  const resetCookie = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    history.push('/')
  }
  return (
    <div className="bg-gray-700 text-gray-400 w-60 pb-6 overflow-y-auto h-full">
      <ServerBlock />
      <UserBlock />
      <ChannelsList />
      <DirectMessages />
      <Applications />
      <button className="flex justify-center mx-4 rounded px-4 py-2 font-bold bg-red-900 text-white w-32" type="button" onClick={() => resetCookie()}>Exit</button>
    </div>
  )
}

export default Sidebar
