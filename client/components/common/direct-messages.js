import React from 'react'
import { useSelector } from 'react-redux'

const DirectMessages = () => {
  const { userList, userStatus } = useSelector((s) => s.users)

  const isOnline = (bool) => {
    if (bool) {
      return 'bg-yellow-300'
    }
    return 'border'
  }

  return (
    <div>
      <div className="px-4 mb-3 font-sans font-bold">Direct Messages</div>

      <div className="flex items-center mb-2 px-4">
        <span className="bg-yellow-300 rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <span className="text-gray-100">Olivia Dunham <i className="text-gray-500 text-sm">(me)</i></span>
      </div>

      <div className="flex items-center mb-2 px-4">
        <span className="bg-yellow-300 rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <span className="text-gray-100">Adam Bishop</span>
      </div>

      <div className="flex items-center px-4 mb-2">
        <span className="border rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <span className="text-gray-100">killgt</span>
      </div>

      {
        Object.keys(userList).map((uid) => {
          return (
            <button type="button" key={`${uid}`} className="flex items-center px-4 mb-2 select-none">
              <span className={`${isOnline(!!userStatus[uid])} rounded-full block w-2 h-2 mr-2`}>&#8194;</span>
              <span className="text-gray-100">{userList[uid].name || 'User'}</span>
            </button>
          )
        })
      }
    </div>
  )
}

export default DirectMessages
