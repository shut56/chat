import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeMessage } from '../../redux/reducers/messages'

const Message = ({ message, name, uid }) => {
  const dispatch = useDispatch()
  const userId = useSelector((s) => s.auth.user?._id)
  const channelId = useSelector((s) => s.channels?.activeChannel)
  const TIME = `${new Date(message.time).toLocaleTimeString()}`

  const removeButton = (bool) => {
    if (bool) {
      return <button onClick={(e) => dispatch(removeMessage(channelId, e.target.dataset.key))} data-key={message._id} type="button" className="flex-shrink-0 bg-gray-900 rounded-full p-1">x</button>
    }
    return undefined
  }

  return (
    <div className="flex items-start mb-4 hover:bg-gray-700 rounded-sm">
      <img src="/assets/images/default.gif" className="w-10 h-10 rounded-full mr-3" alt="User avatar" />
      <div className="flex flex-col flex-grow">
        <div className="flex flex-grow static">
          <span className="flex-shrink-0 font-bold mr-2">{name}</span>
          <span className="flex-shrink-0 text-gray-400 text-xs mb-2">{TIME}</span>
          <div className="flex-grow" />
          {removeButton(userId === uid)}
        </div>
        <p className="text-gray-300 pt-1">{message.text}</p>
      </div>
    </div>
  )
}

export default Message
