import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PopUp from '../components/common/windows/popUp'
import Alert from '../components/common/windows/alert'

import { trySignIn, tryGetUserInfo } from '../redux/reducers/auth'
import { getSocketId } from '../redux/reducers/users'

const Startup = (props) => {
  const dispatch = useDispatch()
  const { popUpActive } = useSelector((s) => s.secondary)
  const { response } = useSelector((s) => s.userSettings)
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
      {response?.text && <Alert />}
      {props.children}
    </div>
  )
}

export default Startup
