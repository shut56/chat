import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { trySignIn, tryGetUserInfo } from '../redux/reducers/auth'
import { getSocketId } from '../redux/reducers/users'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth.token)

  dispatch(getSocketId())
  console.log('Check Startup.js', tryGetUserInfo)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
      // dispatch(tryGetUserInfo())
    }
  }, [dispatch])

  return props.children
}

export default Startup
