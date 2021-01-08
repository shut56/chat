import React from 'react'

const MessageInput = () => {
  return (
    <div className="flex flex-row bg-gray-600 bottom-0 w-full">
      <div className="flex mx-2 mb-4 rounded-lg bg-white overflow-hidden w-full">
        <button type="button" className="m-2 font-bold text-white h-6 w-6 rounded-full border-gray bg-gray-500 opacity-60 hover:opacity-100 z-0">+</button>
        <input type="text" className="px-2 text-black focus:outline-none w-full" placeholder="Message to #general" />
      </div>
    </div>
  )
}

export default MessageInput
