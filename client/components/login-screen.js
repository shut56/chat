import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SignIn from './common/signIn'
import SignUp from './common/signUp'
import ServerResponse from './common/server-response'

import { doRegister } from '../redux/reducers/auth'

const LoginScreen = ({ reg }) => {
  const dispatch = useDispatch()
  const { register, response } = useSelector((s) => s.auth)

  useEffect(() => {
    dispatch(doRegister(reg))
  }, [dispatch])
  return (
    <div className="flex flex-col justify-center bg-gray-800 text-gray-400 w-full h-screen">
      {
        response && <ServerResponse />
      }
      <div className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-max self-center">
        { register ? <SignUp /> : <SignIn /> }
      </div>
    </div>
  )
}

export default LoginScreen
