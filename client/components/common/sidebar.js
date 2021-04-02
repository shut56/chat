import React from 'react'
import { useDispatch } from 'react-redux'

import { signOut } from '../../redux/reducers/auth'
import { clearResponse } from '../../redux/reducers/userSettings'

import ServerBlock from './server-block'
import UserBlock from './user-block'
import ChannelsList from './channels-list'
import DirectMessages from './direct-messages'
import Applications from './applications'

const Sidebar = () => {
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(clearResponse())
    dispatch(signOut())
  }
  return (
    <div className="flex flex-shrink-0 flex-col bg-gray-700 text-gray-400 w-52">
      <div className="top-0">
        <ServerBlock />
        <UserBlock />
      </div>
      <div className="overflow-y-auto h-full">
        <ChannelsList />
        <DirectMessages />
        <Applications />
      </div>
      <button className="mb-2 bottom-0 flex justify-center mx-4 rounded px-4 py-2 font-bold bg-red-900 text-white w-32" type="button" onClick={logOut}>Exit</button>
    </div>
  )
}

export default Sidebar
