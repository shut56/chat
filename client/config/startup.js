import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { trySignIn, tryGetUserInfo } from '../redux/reducers/auth'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth.token)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
      dispatch(tryGetUserInfo())
    }
  }, [dispatch])

  return props.children
}

export default Startup
