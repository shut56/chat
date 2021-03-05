import React from 'react'
import { useSelector } from 'react-redux'

const ChannelHeader = () => {
  const { activeChannel } = useSelector((s) => s.channels)
  const name = useSelector((s) => s.channels?.channelList[activeChannel]?.name)
  const description = useSelector((s) => s.channels?.channelList[activeChannel]?.description)
  return (
    <div className="border-b border-gray-700 shadow flex px-6 py-2 items-center">
      <div className="flex flex-col">
        <div className="text-lg mb-1 font-bold"># {name}</div>
        <div className="text-gray-400 text-md">{description}</div>
      </div>
      <div className="ml-auto hidden md:block">
        <input type="search" placeholder="Search" className="focus:outline-none rounded-lg p-2 bg-gray-800" />
      </div>
    </div>
  )
}

export default ChannelHeader
