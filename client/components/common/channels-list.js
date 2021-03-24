import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { history } from '../../redux'
import { openWindow } from '../../redux/reducers/secondary'
import {
  getChannels, changeActiveChannel, settingsChannel
} from '../../redux/reducers/channels'

const ChannelsList = () => {
  const dispatch = useDispatch()
  const { channelList, activeChannel } = useSelector((s) => s.channels)
  const { isAdmin } = useSelector((s) => s.secondary)
  const uid = useSelector((s) => s.auth.user._id)
  const isActive = (bool) => bool && 'bg-gray-600'

  const onClick = (key) => {
    console.log('key', key)
    dispatch(changeActiveChannel(key))
  }

  const onClickEditButton = (id) => {
    dispatch(settingsChannel(id))
    history.push('/channel-settings')
  }

  const editButton = (id) => {
    console.log(id)
    return (
      <div className="flex flex-col">
        <button type="button" className="text-xs font-bold mb-1 hover:text-white" onClick={() => onClickEditButton(id)}>Edit</button>
        <div className="flex-auto" />
      </div>
    )
  }

  useEffect(() => {
    console.log('GET CHANNELS')
    dispatch(getChannels(uid))
    return () => {}
  }, [dispatch, uid])
  return (
    <div className="m-0">
      <div className="flex flex-row px-4 items-center font-bold justify-between h-8">
        <div>Channels</div>
        {isAdmin && <button type="button" className="focus:outline-none text-xl font-bold mb-1 hover:text-white px-1" onClick={() => dispatch(openWindow(true, 'create'))}>+</button>}
      </div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {Object.keys(channelList).map((chan) => {
          return (
            <div className="flex justify-between" key={chan}>
              <button
                type="button"
                onClick={() => onClick(chan)}
                className={`focus:outline-none py-1 my-0.5 px-2 rounded-md hover:bg-gray-600 w-full text-left select-none ${isActive(chan === activeChannel)}`}
              >
                # {channelList[chan].name}
              </button>
              {isAdmin && editButton(channelList[chan]._id)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChannelsList
