import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createChannel } from '../../redux/reducers/secondary'
import { changeActiveChannel } from '../../redux/reducers/settings'

const Channels = () => {
  const dispatch = useDispatch()
  const channels = useSelector((s) => s.settings.channels)
  const isActive = (bool) => bool && 'bg-gray-600'

  const onClick = (dataset) => {
    dispatch(changeActiveChannel(dataset.key))
  }
  return (
    <div>
      <div className="flex flex-row px-4 items-center font-bold">
        <div className="flex-grow">Channels</div>
        <button type="button" className="text-xl font-bold mb-1 hover:text-white" onClick={() => dispatch(createChannel(true))}>+</button>
      </div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {channels.map((chan) => {
          return (
            <button type="button" onClick={(e) => onClick(e.target.dataset)} data-key={chan.id} className={`focus:outline-none py-1 my-0.5 px-2 rounded-md hover:bg-gray-600 w-full cursor-pointer text-left ${isActive(chan.active)}`} key={chan.id}># {chan.name}</button>
          )
        })}
      </div>
    </div>
  )
}

export default Channels
