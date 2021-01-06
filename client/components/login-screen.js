import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNickname } from '../redux/reducers/messages'

const LoginScreen = ({ toggled }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const onClick = () => {
    dispatch(setNickname(name))
    toggled(false)
  }

  return (
    <div className="bg-gray-200">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col bg-indigo-800 rounded-lg text-white font-bold p-4 items-center">
          <div className="mb-2">Enter your name</div>
          <input type="text" className="text-black my-2" onChange={(e) => setName(e.target.value)} value={name} />
          <button type="button" className="border rounded mt-2 px-4 py-2" onClick={onClick}>Start</button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
