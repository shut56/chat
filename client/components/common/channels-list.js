import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fade } from '../../redux/reducers/secondary'
import {
  getChannels, changeActiveChannel, removeChannel
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

  const removeButton = (id) => {
    return (
      <div className="flex flex-col">
        <button className="focus:outline-none p-1 bg-gray-900 text-xs rounded-full w-6 h-6" type="button" onClick={() => dispatch(removeChannel(id))}>X</button>
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
      <div className="flex flex-row px-4 items-center font-bold justify-between">
        <div>Channels</div>
        {isAdmin && <button type="button" className="text-xl font-bold mb-1 hover:text-white" onClick={() => dispatch(fade(true))}>+</button>}
      </div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {Object.keys(channelList).map((chan) => {
          return (
            <div className="flex justify-between" key={channelList[chan]._id} data-key={channelList[chan]._id}>
              <button
                type="button"
                onClick={(e) => onClick(e.target.parentNode.dataset.key)}
                className={`focus:outline-none py-1 my-0.5 px-2 rounded-md hover:bg-gray-600 w-full cursor-pointer text-left ${isActive(chan === activeChannel)}`}
              >
                # {channelList[chan].name}
              </button>
              {isAdmin && removeButton(channelList[chan]._id)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChannelsList
