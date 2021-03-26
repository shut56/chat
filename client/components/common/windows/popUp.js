import React from 'react'
import { useSelector } from 'react-redux'

import BlackScreen from './black-screen'
import ChannelCreator from './channel-creator'
import UserDataChange from './user-data-change'
import Warning from './warning'

const PopUp = () => {
  const {
    popUpActive,
    channelCreatorToggle,
    updateEmailToggle,
    updatePassowordToggle,
    removeMessageToggle,
    removeChannelToggle
  } = useSelector((s) => s.secondary)

  return (
    <div className="fixed">
      {popUpActive && (
        <BlackScreen>
          {/* eslint-disable-next-line */}
          <div className="fixed flex items-center justify-center text-white m-auto z-10 inset-x-1/2 inset-y-1/2 z-20" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col w-96 h-auto rounded-md bg-gray-800 z-30">
              {channelCreatorToggle && <ChannelCreator />}
              {updateEmailToggle && <UserDataChange email="email" />}
              {updatePassowordToggle && <UserDataChange password="password" />}
              {removeMessageToggle && <Warning message="message" />}
              {removeChannelToggle && <Warning channel="channel" />}
            </div>
          </div>
        </BlackScreen>
      )}
    </div>
  )
}

export default PopUp
