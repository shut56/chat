import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { changeName } from '../../../redux/reducers/userSettings'
import { updateName } from '../../../redux/reducers/auth'

const MyAccount = () => {
  const dispatch = useDispatch()
  const { name, email, _id } = useSelector((s) => s.auth.user)
  const userName = useSelector((s) => s.auth.name)

  const maxLength = 50

  useEffect(() => {
    dispatch(updateName(name))
  }, [name])
  return (
    <div className="flex flex-col px-2">
      <div className="flex flex-row py-2 font-bold">My Account</div>
      <div className="flex flex-col p-2 rounded bg-gray-700">
        <div id="name" className="flex py-1 justify-between items-center">
          <div className="flex flex-col w-full">
            <span className="font-semibold text-gray-400 select-none">{`Your name (maximum ${maxLength} symbols):`}</span>
            <input onChange={(e) => dispatch(updateName(e.target.value))} className="font-semibold focus:outline-none bg-gray-700" placeholder="Enter your name..." maxLength={maxLength} value={userName} />
          </div>
          {name === userName || <button onClick={() => dispatch(changeName(_id, userName))} type="button" className="focus:outline-none hover:bg-gray-800 rounded bg-gray-600 font-semibold px-2 py-1" placeholder="Enter your email...">Change</button>}
        </div>
        <div id="email" className="flex py-1 justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-400 select-none">Your email:</span>
            <span className="font-semibold">{`${email}`}</span>
          </div>
          <button type="button" className="focus:outline-none hover:bg-gray-800 rounded bg-gray-600 font-semibold px-2 py-1">Change</button>
        </div>
      </div>
      <div className="flex flex-row pt-4 pb-2 font-bold">Authentication</div>
      <div className="flex" id="password">
        <button
          type="button"
          className="focus:outline-none hover:bg-indigo-600 flex justify-center my-2 rounded px-4 py-2 font-bold bg-indigo-500 text-white w-auto"
        >
          Change password
        </button>
      </div>
    </div>
  )
}

export default MyAccount
