import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateLogin, updatePassword, signIn } from '../redux/reducers/auth'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const { login, password } = useSelector((s) => s.auth)
  return (
    <div className="flex justify-center bg-gray-800 text-gray-400 w-full h-screen">
      <div className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-max self-center">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input onChange={(e) => dispatch(updateLogin(e.target.value))} value={login} className="focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 text-black" id="username" type="text" name="username" placeholder="Enter username..." />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input onChange={(e) => dispatch(updatePassword(e.target.value))} value={password} className="focus:outline-none shadow appearance-none border border-red rounded w-full py-2 px-3 text-black mb-3" id="password" name="passowrd" type="password" placeholder="Enter password..." />
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => dispatch(signIn())} className="bg-blue hover:bg-blue-dark text-gray-400 hover:text-white font-bold py-2 px-4 border rounded self-center" type="button">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
