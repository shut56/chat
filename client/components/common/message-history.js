import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Message from './message'
import { saveScrollPoint } from '../../redux/reducers/settings'

const MessageHistory = () => {
  const dispatch = useDispatch()
  const channelId = useSelector((store) => store.channels.activeChannel)
  const scrollPosition = useSelector((store) => store.settings.scrollPoints[channelId])
  const channelMessageHistory = useSelector((store) => store.messages.messageHistory[channelId]) || []
  const { userList } = useSelector((store) => store.users)
  const myRef = useRef(null)

  const onScroll = () => {
    dispatch(saveScrollPoint(channelId, myRef.current.scrollTop))
  }

  useEffect(() => {
    myRef.current.scrollTo({
      behavior: 'auto',
      top: scrollPosition
    })
    console.log('SCROLL POSITION:', channelId, scrollPosition)
    return () => {}
  }, [channelId])

  return (
    <div onScroll={onScroll} id="message-history" className="px-4 py-4 overflow-y-auto h-full" ref={myRef}>
      {channelMessageHistory.map((message) => {
        const name = userList[message.uid]?.name || 'Some user'
        return (
          <div key={`${message._id}`}>
            <Message message={message} name={name} uid={message.uid} />
          </div>
        )
      })}
      <div id="history-end" />
    </div>
  )
}

export default MessageHistory
