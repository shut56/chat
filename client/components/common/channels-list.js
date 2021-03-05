import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fade } from '../../redux/reducers/secondary'
import { getChannels, changeActiveChannel, removeChannel } from '../../redux/reducers/channels'

const ChannelsList = () => {
  const dispatch = useDispatch()
  const { channelList } = useSelector((s) => s.channels)
  const isActive = (bool) => bool && 'bg-gray-600'

  const onClick = (key) => {
    console.log('key', key)
    dispatch(changeActiveChannel(key))
  }

  useEffect(() => {
    dispatch(getChannels())
    return () => {}
  }, [dispatch])
  return (
    <div>
      <div className="flex flex-row px-4 items-center font-bold">
        <div className="flex-grow">Channels</div>
        <button type="button" className="text-xl font-bold mb-1 hover:text-white" onClick={() => dispatch(fade(true))}>+</button>
      </div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {Object.keys(channelList).map((chan) => {
          return (
            <button
              key={channelList[chan]._id}
              type="button"
              onClick={(e) => onClick(e.target.dataset.key)}
              data-key={channelList[chan]._id}
              className={`flex justify-between focus:outline-none py-1 my-0.5 px-2 rounded-md hover:bg-gray-600 w-full cursor-pointer text-left ${isActive(channelList[chan].active)}`}
            >
              # {channelList[chan].name}
              <button className="px-2 bg-gray-900 rounded-full" type="button" onClick={(e) => dispatch(removeChannel(e.target.parentNode.dataset.key))}>X</button>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ChannelsList
