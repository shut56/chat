import React from 'react'
import { useSelector } from 'react-redux'

const ChannelHeader = () => {
  const { activeChannel } = useSelector((s) => s.channels)
  const name = useSelector((s) => s.channels?.channelList[activeChannel]?.name)
  const description = useSelector((s) => s.channels?.channelList[activeChannel]?.description)
  return (
    <div className="flex items-center p-2 border-b border-gray-700 shadow h-14 w-full">
      <div className="flex min-w-0 items-center">
        <div className="text-lg font-semibold pr-2 truncate"># {name}</div>
      </div>
      <div className="flex flex-1 min-w-0">
        {description && (
          <div className="border-l-2 border-gray-500 items-center px-2 truncate">
            {description}
          </div>
        )}
      </div>
      <div className="flex flex-shrink-0">
        <input type="search" placeholder="Search" className="focus:outline-none rounded-lg bg-gray-800 p-2" />
      </div>
    </div>
  )
}

export default ChannelHeader
