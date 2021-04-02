import React from 'react'

import { history } from '../redux'

const Main = () => {
  const enter = () => {
    history.push('/channels')
  }
  return (
    <div className="flex flex-col">
      <div className="px-4 mb-3 font-sans font-bold">This is Chat</div>
      <button className="flex justify-center mx-4 rounded px-4 py-2 font-bold bg-red-900 text-white w-32" type="button" onClick={() => enter()}>Login</button>
    </div>
  )
}

export default Main
