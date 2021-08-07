import React from 'react'
// import { useDispatch } from 'react-redux'

// import { openWindow, setPopUpActive } from '../../../redux/reducers/secondary'

const BlackScreen = ({ children }) => {
  // const dispatch = useDispatch()

  // const closeWindow = () => {
  //   // dispatch(openWindow(false))
  //   // dispatch(setPopUpActive(false))
  //   console.log('Windows closed')
  // }

  return (
    <div className="cursor-default fixed text-white top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-10">
      {children}
    </div>
    // <button
    //   type="button"
    //   onClick={closeWindow}
    //   className="cursor-default fixed text-white top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-10"
    // >
    //   {children}
    // </button>
  )
}

export default BlackScreen
