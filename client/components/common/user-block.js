import React from 'react'
import { useSelector } from 'react-redux'

const UserBlock = () => {
  const { nickname } = useSelector((s) => s.messages)

  return (
    <div>
      <div className="flex items-center mb-6 px-4 py-2 bg-gray-800 text-white">
        <span className="bg-yellow-300 rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <div className="text-gray-100">{nickname}</div>
      </div>
    </div>
  )
}

export default UserBlock
