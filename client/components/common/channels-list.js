import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fade } from '../../redux/reducers/secondary'
import { getChannels, changeActiveChannel } from '../../redux/reducers/channels'

const ChannelsList = () => {
  console.log('Render Channel List')
  const dispatch = useDispatch()
  const { channelList } = useSelector((s) => s.channels)
  const isActive = (bool) => bool && 'bg-gray-600'

  const onClick = (dataset) => {
    dispatch(changeActiveChannel(dataset.key))
  }

  useEffect(() => {
    console.log('Hello!')
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
            <button type="button" onClick={(e) => onClick(e.target.dataset)} data-key={channelList[chan].id} className={`focus:outline-none py-1 my-0.5 px-2 rounded-md hover:bg-gray-600 w-full cursor-pointer text-left ${isActive(channelList[chan].active)}`} key={channelList[chan].id}># {channelList[chan].name}</button>
          )
        })}
      </div>
    </div>
  )
}

export default ChannelsList
