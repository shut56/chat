import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createChannel } from '../../redux/reducers/secondary'

const Channels = () => {
  const dispatch = useDispatch()
  const channels = useSelector((s) => s.settings.channels)
  return (
    <div>
      <div className="flex flex-row px-4 items-center font-bold">
        <div className="flex-grow">Channels</div>
        <button type="button" className="text-xl font-bold mb-1 hover:text-white" onClick={() => dispatch(createChannel(true))}>+</button>
      </div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {channels.map((chan) => {
          return (
            <div className="py-1 px-2 rounded-md hover:bg-gray-600 w-full cursor-pointer" key={chan.id}># {chan.name}</div>
          )
        })}
      </div>
    </div>
  )
}

export default Channels
