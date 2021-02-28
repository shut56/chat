import React from 'react'

const Message = ({ message }) => {
  const TIME = `${new Date(message.time).toLocaleTimeString()}`
  return (
    <div className="flex items-start mb-4">
      <img src="/assets/images/default.gif" className="w-10 h-10 rounded-full mr-3" alt="User avatar" />
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold mr-2">{message.name}</span>
          <span className="text-gray-400 text-xs mb-2">{TIME}</span>
        </div>
        <p className="text-gray-300 pt-1">{message.text}</p>
      </div>
    </div>
  )
}

export default Message
