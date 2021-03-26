import React from 'react'
import { useSelector } from 'react-redux'

import BlackScreen from './black-screen'
import ChannelCreator from './channel-creator'
import UserDataChange from './user-data-change'
import Warning from './warning'

const PopUp = () => {
  const { popUpActive, toggles } = useSelector((s) => s.secondary)
  const {
    channelCreator,
    updateEmail,
    updatePassoword,
    removeMessage,
    removeChannel
  } = toggles

  return (
    <div className="fixed">
      {popUpActive && (
        <BlackScreen>
          {/* eslint-disable-next-line */}
          <div className="fixed flex items-center justify-center text-white m-auto inset-x-1/2 inset-y-1/2" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col w-96 h-auto rounded-md bg-gray-800 z-30">
              {channelCreator && <ChannelCreator />}
              {updateEmail && <UserDataChange email="email" />}
              {updatePassoword && <UserDataChange password="password" />}
              {removeMessage && <Warning message="message" />}
              {removeChannel && <Warning channel="channel" />}
            </div>
          </div>
        </BlackScreen>
      )}
    </div>
  )
}

export default PopUp
