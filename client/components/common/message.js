import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeMessage } from '../../redux/reducers/messages'

const Message = ({ message, name, uid }) => {
  const dispatch = useDispatch()
  const userId = useSelector((s) => s.auth.user?._id)
  const channelId = useSelector((s) => s.channels?.activeChannel)
  const { isAdmin } = useSelector((s) => s.secondary)
  const TIME = `${new Date(message.time).toLocaleTimeString()}`

  const removeButton = (bool) => {
    if (bool) {
      return (
        <div className="flex flex-col">
          <button
            onClick={() => dispatch(removeMessage(channelId, message._id))}
            type="button"
            className="flex-shrink-0 flex justify-center items-center bg-gray-900 rounded-full text-xs p-1 w-4 h-4"
          >
            X
          </button>
          <div className="flex-auto" />
        </div>
      )
    }
    return undefined
  }

  return (
    <div className="flex items-start hover:bg-gray-700 rounded px-2 py-1">
      {/* <img src="/assets/images/default.gif" className="w-10 h-10 rounded-full mr-3" alt="User avatar" /> */}
      <div className="flex flex-col flex-grow">
        <div className="flex flex-grow static">
          <span className="flex-shrink-0 font-semibold mr-2">{name}</span>
          <span className="flex-shrink-0 text-gray-400 text-xs mb-2">{TIME}</span>
          <div className="flex-grow" />
          {removeButton(userId === uid || isAdmin)}
        </div>
        <p className="text-gray-300 pl-2">{message.text}</p>
      </div>
    </div>
  )
}

export default Message
