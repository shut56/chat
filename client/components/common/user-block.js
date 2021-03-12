import React from 'react'
import { useSelector } from 'react-redux'

import { history } from '../../redux'

const UserBlock = () => {
  const { name } = useSelector((s) => s.auth?.user)

  return (
    <div>
      <button type="button" onClick={() => history.push('/profile')} className="focus:outline-none hover:bg-gray-900 flex items-center mb-6 px-4 py-2 bg-gray-800 text-white select-none w-full">
        <span className="bg-yellow-300 rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <div className="text-gray-100">{name || 'User'}</div>
      </button>
    </div>
  )
}

export default UserBlock
