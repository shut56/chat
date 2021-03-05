import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { history } from '../../redux'
import {
  updateLogin, updatePassword, updateName, signUp, doRegister, clearResponse
} from '../../redux/reducers/auth'

const SignUp = () => {
  const dispatch = useDispatch()
  const {
    email, password, name, register
  } = useSelector((s) => s.auth)

  const onClick = () => {
    history.push('/login')
    dispatch(doRegister(!register))
    dispatch(clearResponse())
  }
  return (
    <div>
      <div className="flex justify-center font-bold mb-2 text-lg text-white">
        <span>Create your account</span>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input onChange={(e) => dispatch(updateName(e.target.value))} value={name} className="focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 text-black" id="username" type="text" name="username" placeholder="Enter your name..." />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Email address
        </label>
        <input onChange={(e) => dispatch(updateLogin(e.target.value))} value={email} className="focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 text-black" id="email" type="text" name="email" placeholder="Enter email..." />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input onChange={(e) => dispatch(updatePassword(e.target.value))} value={password} className="focus:outline-none shadow appearance-none border border-red rounded w-full py-2 px-3 text-black mb-3" id="password" name="passowrd" type="password" placeholder="Enter password..." />
      </div>
      <div className="flex items-center justify-center">
        <button onClick={() => dispatch(signUp())} className="bg-blue hover:bg-blue-dark text-gray-400 hover:text-white font-bold py-2 px-4 border rounded self-center" type="button">
          Create account
        </button>
      </div>
      <div className="mt-4">
        Already Registered? <button type="button" className="text-white hover:underline" onClick={() => onClick()}>Sign in</button>
      </div>
    </div>
  )
}

export default SignUp
