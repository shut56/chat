import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PopUp from '../components/common/windows/popUp'

import { trySignIn, tryGetUserInfo } from '../redux/reducers/auth'
import { getSocketId } from '../redux/reducers/users'

const Startup = (props) => {
  const dispatch = useDispatch()
  const { popUpActive } = useSelector((s) => s.secondary)
  const token = useSelector((s) => s.auth.token)

  dispatch(getSocketId())
  console.log('Check Startup.js', tryGetUserInfo)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
      // dispatch(tryGetUserInfo())
    }
  }, [dispatch])

  return (
    <div>
      {popUpActive && <PopUp />}
      {props.children}
    </div>
  )
}

export default Startup
