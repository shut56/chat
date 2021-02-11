import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getMessageHistory } from '../../redux/reducers/messages'

import Message from './message'

const MessageHistory = () => {
  const dispatch = useDispatch()
  const { messageHistory } = useSelector((store) => store.messages)
  const { activeChannel } = useSelector((store) => store.channels)

  useEffect(() => {
    dispatch(getMessageHistory(activeChannel))
  }, [dispatch, activeChannel])

  return (
    <div id="message-history" className="px-6 py-4 overflow-y-auto h-full">
      {messageHistory.map((message, id) => {
        return (
          <div key={`${message.name}${id}`}>
            <Message message={message} />
          </div>
        )
      })}
      <div id="history-end" />
    </div>
  )
}

export default MessageHistory
