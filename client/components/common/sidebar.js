import React from 'react'
import { useDispatch } from 'react-redux'

import { signOut, clearResponse } from '../../redux/reducers/auth'

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
    <div className="bg-gray-700 text-gray-400 w-60 pb-6 overflow-y-auto h-full">
      <ServerBlock />
      <UserBlock />
      <ChannelsList />
      <DirectMessages />
      <Applications />
      <button className="flex justify-center mx-4 rounded px-4 py-2 font-bold bg-red-900 text-white w-32" type="button" onClick={logOut}>Exit</button>
    </div>
  )
}

export default Sidebar
