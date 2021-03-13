import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fade } from '../../redux/reducers/secondary'
import {
  getChannels, changeActiveChannel, removeChannel
} from '../../redux/reducers/channels'

const ChannelsList = () => {
  const dispatch = useDispatch()
  const { channelList, activeChannel } = useSelector((s) => s.channels)
  const uid = useSelector((s) => s.auth.user._id)
  const isActive = (bool) => bool && 'bg-gray-600'

  const onClick = (key) => {
    console.log('key', key)
    dispatch(changeActiveChannel(key))
  }

  useEffect(() => {
    dispatch(getChannels(uid))
    return () => {}
  }, [dispatch])
  return (
    <div className="m-0">
      <div className="flex flex-row px-4 items-center font-bold justify-between">
        <div>Channels</div>
        <button type="button" className="text-xl font-bold mb-1 hover:text-white" onClick={() => dispatch(fade(true))}>+</button>
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
              <button className="p-1 bg-gray-900 rounded-full" type="button" onClick={(e) => dispatch(removeChannel(e.target.parentNode.dataset.key))}>X</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChannelsList
