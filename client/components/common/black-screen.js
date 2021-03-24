import React from 'react'
import { useDispatch } from 'react-redux'

import { openWindow } from '../../redux/reducers/secondary'

const BlackScreen = () => {
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      onClick={() => dispatch(openWindow(false))}
      className="cursor-default fixed flex items-center justify-center text-white w-full h-full bg-black bg-opacity-80 z-10"
    />
  )
}

export default BlackScreen
