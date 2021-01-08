import React from 'react'

const Message = () => {
  return (
    <div className="flex items-start mb-4">
      <img src="/assets/images/default.gif" className="w-10 h-10 rounded-full mr-3" alt="User avatar" />
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold mr-2">killgt</span>
          <span className="text-gray-400 text-xs mb-2">11:46</span>
        </div>
        <p className="text-gray-300 pt-1">The slack from the other side.</p>
      </div>
    </div>
  )
}

export default Message
