import React from 'react'

import { history } from '../redux'

const Main = () => {
  const enter = () => {
    history.push('/channels')
  }
  return (
    <div className="flex justify-center">
      <div className="flex p-4 h-96 max-w-6xl">
        <div className="flex flex-col flex-1 justify-evenly items-center bg-gray-600 border-gray-600 border-2 border-r-0 rounded-l-md">
          <div className="px-4 text-6xl font-sans font-bold text-gray-300">This is Pepe Chat.</div>
          <div className="px-4 text-2xl font-sans font-bold text-gray-300">Welcome to my Swamp. Qua!</div>
          <button className="flex justify-center items-center m-4 rounded-md shadow-md px-4 py-2 font-bold text-2xl bg-red-900 text-white w-48 h-16" type="button" onClick={() => enter()}>Login</button>
        </div>
        <div className="flex flex-1 h-full">
          <img src="assets/images/pepe-real.jpeg" alt="Plush Pepe" className="object-cover rounded-r-md" />
        </div>
      </div>
    </div>
  )
}

export default Main
