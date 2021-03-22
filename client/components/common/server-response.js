import React from 'react'
import { useSelector } from 'react-redux'

const ServerResponse = () => {
  const { response } = useSelector((s) => s.userSettings)
  return (
    <div className="flex self-center top-3 absolute bg-gray-700 shadow-md rounded px-8 py-6 my-4 w-max select-none animate-emersion">
      {response.text}
    </div>
  )
}

export default ServerResponse
