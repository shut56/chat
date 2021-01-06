import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoginScreen from './login-screen'
import ChatLine from './chat-line'

import { getMessageHistory } from '../redux/reducers/messages'

const Main = () => {
  const [toggle, setToggle] = useState(true)
  const dispatch = useDispatch()
  const messageHistory = useSelector((store) => store.messages.messageHistory)

  useEffect(() => {
    dispatch(getMessageHistory())
  }, [])
  return (
    <div>
      {toggle && <LoginScreen toggled={setToggle} />}
      <div className="flex flex-col w-full">
        <div className="font-bold">Pepe&apos;s Chat</div>
        <div className="flex mx-2">
          <ul id="messages">
            {messageHistory.map((message, id) => {
              return (
                <li key={`${message.name}${id}`}>{`${message.name}: ${message.text}`}</li>
              )
            })}
          </ul>
        </div>
        {!toggle && <ChatLine />}
      </div>
    </div>
  )
}

export default Main
