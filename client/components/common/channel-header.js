import React from 'react'

const ChannelHeader = () => {
  return (
    <div className="border-b border-gray-700 shadow flex px-6 py-2 items-center">
      <div className="flex flex-col">
        <h3 className="text-lg mb-1 font-bold">#general</h3>
        <div className="text-gray-400 text-md">
          Chit-chattin&apos; about ugly HTML and mixing of concerns.
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <input type="search" placeholder="Search" className="focus:outline-none rounded-lg p-2 bg-gray-800" />
      </div>
    </div>
  )
}

export default ChannelHeader
